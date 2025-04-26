"use server";

import { Prisma } from "@prisma/client";
import { CreateProduct } from "@/interfaces/actions/create-product";
import { ErrorPrisma } from "@/interfaces/actions/error-prisma";
import { productFormSchema } from "@/schema/product-form-schema";
import prisma from "@/lib/prisma";
import { Size } from "@/interfaces/shared/size";

export const createProduct = async ({
  productFormData,
}: CreateProduct): Promise<ErrorPrisma> => {
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

    const { category, type, id, ...restProduct } = productParsed.data;

    if (id) {
      return {
        ok: false,
        message: "El producto no tiene que tener un id",
      };
    }

    prisma.$transaction(async (tx) => {
      const createdProduct = await tx.product.create({
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
        createdProduct,
      };
    });

    return {
      ok: true,
      message: "Producto creado correctamente",
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
