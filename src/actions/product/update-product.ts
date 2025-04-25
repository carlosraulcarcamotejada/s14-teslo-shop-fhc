"use server";

import { Prisma, ProductImage } from "@prisma/client";
import { UpdateProduct } from "@/interfaces/actions/update-product";
import { ErrorPrisma } from "@/interfaces/actions/error-prisma";
import { productFormSchema } from "@/schema/product-form-schema";
import prisma from "@/lib/prisma";
import { Size } from "@/interfaces/shared/size";
import { Product } from "@/interfaces/product/product";
import { getProduct } from "./get-product";

export const updateProduct = async ({
  productFormData,
}: UpdateProduct): Promise<
  ErrorPrisma & { updatedProduct?: Product & { productImage?: ProductImage[] } }
> => {
  try {
    console.log("updateProduct");
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
        ok: false,
        message: "No pudo ser parseado",
      };
    }

    const { category, type, id, ...restProduct } = productParsed.data;

    if (!id) {
      return {
        ok: false,
        message: "El producto no tiene un id",
      };
    }

    const prismaTx = await prisma.$transaction(async (tx) => {
      const updatedProduct = await tx.product.update({
        where: { id },
        data: {
          ...restProduct,
          categoryId: category,
          typeId: type,
          sizes: {
            set: restProduct.sizes as Size[],
          },
        },
      });

      return {
        updatedProduct,
      };
    });

    return {
      ok: true,
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
