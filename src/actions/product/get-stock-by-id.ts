"use server";

import prisma from "@/lib/prisma";

export const getStockById = async (id: string): Promise<number | undefined> => {
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
