"use server";
import { Prisma } from "@prisma/client";
import { CreateProductArgs } from "@/interfaces/actions/create-product-args";
import { ApiResponse } from "@/interfaces/actions/api-response";
import { productFormSchema } from "@/schema/product-form-schema";
import prisma from "@/lib/prisma";
import { SizeOption } from "@/interfaces/shared/size-option";
import { Product } from "@/interfaces/product/product";
import { CategoryOption } from "@/interfaces/category/category-option";
import { TypeOption } from "@/interfaces/type/type-option";
import { revalidatePath } from "next/cache";
import { uploadImages } from "@/lib/upload-images";

export const createProduct = async ({
  productFormData,
}: CreateProductArgs): Promise<ApiResponse & { createdProduct?: Product }> => {
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
    console.log("productParsed: ", productParsed);

    if (!productParsed.success) {
      return {
        message: "No pudo ser parseado",
        success: false,
      };
    }

    const { id, imagesFile, ...restProduct } = productParsed.data;

    if (id) {
      return {
        message: "El producto no tiene que tener un id",
        success: false,
      };
    }

    const prismaTx = await prisma.$transaction(async (tx) => {
      const createdProduct = await tx.product.create({
        data: {
          ...restProduct,
          sizes: {
            set: restProduct.sizes as SizeOption[],
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
        createdProduct,
      };
    });

    const { createdProduct: createdProductData } = prismaTx;

    if (!createdProductData) {
      return {
        message: "No se pudo crear el producto",
        success: false,
      };
    }

    const {
      category: categoryCreateddProduct,
      productImage,
      type: typeCreatedProduct,
      ...restCreatedProduct
    } = createdProductData;

    const createdProduct: Product = {
      ...restCreatedProduct,
      categoryOption: categoryCreateddProduct.name as CategoryOption,
      typeOption: typeCreatedProduct.name as TypeOption,
      images: productImage.map((image) => image.url),
    };

    revalidatePath("/admin/products");
    revalidatePath(`/admin/product/${createdProductData.slug}`);
    revalidatePath(`/product/${createdProductData.slug}`);

    // Agregación de imagenes:
    if (productFormData.getAll("imagesFile") as File[]) {
      const imageFiles = productFormData.getAll("imagesFile") as File[];

      const images = await uploadImages(imageFiles);

      if (!images) throw new Error("No se pudo subir las imágenes");

      await prisma.productImage.createMany({
        data: images.map((image) => ({
          url: image,
          productId: createdProduct.id ?? "",
        })),
      });
    }

    return {
      createdProduct,
      message: "Producto creado correctamente",
      success: true,
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
        message: "No hay productos en el pedido.",
        success: false,
      };
    }
  }
};
