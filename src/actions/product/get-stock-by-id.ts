"use server";

import prisma from "@/lib/prisma";
import { GetStockById } from "@/interfaces/actions/get-stock-by-id";

export const getStockById = async ({
  id,
}: GetStockById): Promise<number | undefined> => {
  try {
    const product = await prisma.product.findFirst({ where: { id } });

    if (!product) return undefined;

    const { inStock } = product;

    return inStock;
  } catch (error) {
    console.log(error);
    throw new Error("No se pudo obtener el stock.");
  }
};
