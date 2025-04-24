"use server";

import { Prisma } from "@prisma/client";
import { CreateProduct } from "@/interfaces/actions/create-product";
import { ErrorPrisma } from "@/interfaces/actions/error-prisma";
import { productFormSchema } from "@/schema/product-form-schema";
import prisma from "@/lib/prisma";

export const createProduct = async ({
  productFormData,
}: CreateProduct): Promise<ErrorPrisma> => {
  try {
    // 1) Debug: ver qué tiene el iterador
    // console.log("Iterador entries():", Array.from(productFormData.entries()));

    const imageFiles = productFormData.getAll("images");

    // 2) Convertir en objeto plano
    const dataObject = Object.fromEntries(productFormData.entries());
    // console.log("Objeto para Zod:", dataObject);

    // 3)
    const dataForZod = {
      ...dataObject,
      images: imageFiles,
    };

    // 4) Parsear con Zod
    const productParsed = productFormSchema.safeParse(dataObject);
    // console.log("productParsed: ", productParsed);

    if (!productParsed.success) {
      return {
        ok: false,
        message: "No pudo ser parseado",
      };
    }

    const product = productParsed.data;

    const { id, ...restProduct } = product;

    const prismaTx = prisma.$transaction(async (tx) => {
      if (!id) {
        
      }

      return {};
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
