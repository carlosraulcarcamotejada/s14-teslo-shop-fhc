"use server";
import { Prisma } from "@prisma/client";
import prisma from "@/lib/prisma";
import { GetStockByIdArgs } from "@/interfaces/actions/get-stock-by-id-args";
import { ApiResponse } from "@/interfaces/actions/api-response";

export const getStockById = async ({
  id,
}: GetStockByIdArgs): Promise<ApiResponse & { inStock?: number }> => {
  try {
    const product = await prisma.product.findFirst({ where: { id } });

    if (!product) {
      return {
        message: `No se encontró el producto con el id ${id}`,
        success: false,
      };
    }

    const { inStock } = product;

    return {
      inStock,
      message: "Stock obtenido correcto",
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
