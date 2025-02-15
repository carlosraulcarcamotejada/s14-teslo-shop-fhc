"use server";

import prisma from "@/lib/prisma";
import { Category, Product, Type } from "@/seed/seed";

interface PaginationOptions {
  page?: number;
  take?: number;
}

export const getPaginatedProductsWithImages = async ({
  page = 1,
  take = 12,
}: PaginationOptions): Promise<{
  currentPage: number;
  totalPages: number;
  products: Product[];
}> => {
  if (isNaN(Number(page))) page = 1;
  if (page < 1) page = 1;

  if (isNaN(Number(take))) take = 12;
  if (take < 1) take = 12;

  try {
    // 1. Obetener los productos
    const products = await prisma.product.findMany({
      take,
      skip: (page - 1) * take,
      include: { productImage: { take: 2, select: { url: true } } },
    });

    // 2. Obtener el total de páginas
    const totalItems = await prisma.product.count({});

    const totalPages = Math.ceil(totalItems / take);

    return {
      currentPage: page,
      totalPages,
      products: products.map((product) => {
        const { categoryId, typeId, productImage, ...restProduct } = product;

        return {
          images: productImage.map((image) => image.url),
          category: categoryId as Category,
          type: typeId as Type,
          ...restProduct,
        };
      }),
    };
  } catch (error) {
    throw new Error("Servicio no disponible");
  }
};
