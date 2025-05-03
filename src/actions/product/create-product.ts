"use server";

import { Prisma } from "@prisma/client";
import { CreateProduct } from "@/interfaces/actions/create-product";
import { ErrorPrisma } from "@/interfaces/actions/error-prisma";
import { productFormSchema } from "@/schema/product-form-schema";
import prisma from "@/lib/prisma";
import { Size } from "@/interfaces/shared/size";
import { Product } from "@/interfaces/product/product";
import { CategoryOption } from "@/interfaces/category/category-option";
import { TypeOption } from "@/interfaces/type/type-option";
import { revalidatePath } from "next/cache";

export const createProduct = async ({
  productFormData,
}: CreateProduct): Promise<ErrorPrisma & { createdProduct?: Product }> => {
  try {
    console.log("createProduct");
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

    // 3)
    const dataForZod = {
      ...dataObject,
      sizes,
    };

    // 4) Parsear con Zod
    const productParsed = productFormSchema.safeParse(dataForZod);
    console.log("productParsed: ", productParsed);

    if (!productParsed.success) {
      return {
        ok: false,
        message: "No pudo ser parseado",
      };
    }

    const { id, ...restProduct } = productParsed.data;

    if (id) {
      return {
        ok: false,
        message: "El producto no tiene que tener un id",
      };
    }

    const prismaTx = await prisma.$transaction(async (tx) => {
      const createdProduct = await tx.product.create({
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
        createdProduct,
      };
    });

    const { createdProduct } = prismaTx;

    if (!createdProduct) {
      return {
        ok: false,
      };
    }

    const {
      category: categoryCreateddProduct,
      productImage,
      type: typeCreatedProduct,
      ...restCreatedProduct
    } = createdProduct;

    const createdProductData: Product = {
      ...restCreatedProduct,
      categoryOption: categoryCreateddProduct.name as CategoryOption,
      typeOption: typeCreatedProduct.name as TypeOption,
      images: productImage.map((image) => image.url),
    };

    revalidatePath("/admin/products");
    revalidatePath(`/admin/product/${createdProductData.slug}`);
    revalidatePath(`/product/${createdProductData.slug}`);

    return {
      ok: true,
      message: "Producto creado correctamente",
      createdProduct: createdProductData,
    };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return {
        code: error.code,
        message: `Prisma error: ${error.message}`,
        ok: false,
      };
    } else if (error instanceof Error) {
      return {
        message: error.message,
        ok: false,
      };
    } else {
      return {
        message: "An unknown error occurred.",
        ok: false,
      };
    }
  }
};
