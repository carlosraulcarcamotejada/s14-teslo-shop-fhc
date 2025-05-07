"use server";

import { Prisma } from "@prisma/client";
import { UpdateProductArgs } from "@/interfaces/actions/update-product-args";
import { ApiResponse } from "@/interfaces/actions/api-response";
import { productFormSchema } from "@/schema/product-form-schema";
import prisma from "@/lib/prisma";
import { Size } from "@/interfaces/shared/size";
import { Product } from "@/interfaces/product/product";
import { TypeOption } from "@/interfaces/type/type-option";
import { CategoryOption } from "@/interfaces/category/category-option";
import { revalidatePath } from "next/cache";
import { cloudinary } from "@/config/cloudinary";

export const updateProduct = async ({
  productFormData,
}: UpdateProductArgs): Promise<ApiResponse & { updatedProduct?: Product }> => {
  try {
    // 1) Debug: ver qué tiene el iterador
    // console.log("Iterador entries():", Array.from(productFormData.entries()));

    const rawSizes = productFormData.getAll("sizes");

    // Si rawSizes = ['XS,S,M,L'], entonces:
    const sizes = rawSizes
      .map((s) => (typeof s === "string" ? s.split(",") : [])) // dividir si es string
      .flat()
      .filter(Boolean); // eliminar strings vacíos

    // 2) Convertir en objeto plano
    const dataObject = Object.fromEntries(productFormData.entries());
    // console.log("Objeto para Zod:", dataObject);

    // 3) prepara objeto para ser parseado por zod
    const dataForZod = {
      ...dataObject,
      sizes,
    };

    // 4) Parsear con Zod
    const productParsed = productFormSchema.safeParse(dataForZod);
    // console.log("productParsed: ", productParsed.data);

    if (!productParsed.success) {
      return {
        success: false,
        message: "No pudo ser parseado",
      };
    }

    // Agregación de imagenes:
    if (productFormData.getAll("imagesFile") as File[]) {
      const imageFiles = productFormData.getAll("imagesFile") as File[];

      const images = await uploadImages(imageFiles);

      if (!images) throw new Error("No se pudo subir las imágenes");

      await prisma.productImage.createMany({
        data: images.map((image) => ({
          url: image,
          productId: productParsed.data.id ?? "",
        })),
      });
    }

    const { id, imagesFile, ...restProduct } = productParsed.data;

    void imagesFile;

    if (!id) {
      return {
        success: false,
        message: "El producto no tiene un id",
      };
    }

    const prismaTx = await prisma.$transaction(async (tx) => {
      const updatedProduct = await tx.product.update({
        where: { id },
        data: {
          ...restProduct,

          sizes: {
            set: restProduct.sizes as Size[],
          },
        },
        include: {
          productImage: {
            select: { url: true },
          },
          category: {
            select: { name: true },
          },
          type: {
            select: { name: true },
          },
        },
      });

      return {
        updatedProduct,
      };
    });

    const { updatedProduct } = prismaTx;

    if (!updatedProduct) {
      return {
        success: false,
        message: "No se pudo actualizó el producto",
      };
    }

    const {
      category: categoryUpdatedProduct,
      type: typeUpdatedProduct,
      productImage,
      ...restUpdatedProduct
    } = updatedProduct;

    const updatedProductData: Product = {
      ...restUpdatedProduct,
      categoryOption: categoryUpdatedProduct.name as CategoryOption,
      typeOption: typeUpdatedProduct.name as TypeOption,
      images: productImage.map((image) => image.url),
    };

    revalidatePath("/admin/products");
    revalidatePath(`/admin/product/${updatedProductData.slug}`);
    revalidatePath(`/product/${updatedProductData.slug}`);

    return {
      message: "Producto actualizado correctamente",
      success: true,
      updatedProduct: updatedProductData,
    };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return {
        code: error.code,
        message: `Prisma error: ${error.message}`,
        success: false,
      };
    } else if (error instanceof Error) {
      return {
        message: error.message,
        success: false,
      };
    } else {
      return {
        message: "An unknown error occurred.",
        success: false,
      };
    }
  }
};

const uploadImages = async (
  imagesFile: File[]
): Promise<string[] | undefined> => {
  try {
    // console.log("imagesFile: ", imagesFile);

    const uploadPromises = imagesFile.map(async (image) => {
      const buffer = await image.arrayBuffer();
      const base64Image = Buffer.from(buffer).toString("base64");

      return cloudinary.uploader
        .upload(`data:image/png;base64,${base64Image}`)
        .then((r) => r.secure_url);
    });

    const uploadedImages = await Promise.all(uploadPromises);

    return uploadedImages;
  } catch (error) {
    console.log("error en uploadImages ", error);
    return undefined;
  }
};
