"use server";

import prisma from "@/lib/prisma";
import { Category, Product, Type } from "@/seed/seed";

interface PaginationOptions {
  page?: number;
  take?: number;
  category?: Category;
}

export const getPaginatedProductsWithImages = async ({
  category,
  page = 1,
  take = 12,
}: PaginationOptions): Promise<{
  currentPage: number;
  totalPages: number;
  products: Product[];
  categoriesMap: Map<Category, string>;
}> => {
  if (isNaN(Number(page))) page = 1;
  if (page < 1) page = 1;

  if (isNaN(Number(take))) take = 12;
  if (take < 1) take = 12;

  try {
    // 1. Obtener las categorias
    const categories = await prisma.category.findMany();

    const categoriesMap = new Map<Category, string>();

    categories.forEach((category) => {
      categoriesMap.set(category.name as Category, category.id);
    });

    // 2. Obetener los productos
    const products = await prisma.product.findMany({
      take,
      skip: (page - 1) * take,
      include: { productImage: { take: 2, select: { url: true } } },

      ...(category && {
        where: { categoryId: categoriesMap.get(category) },
      }),
    });

    // 3. Obtener el total de páginas
    const totalItems = await prisma.product.count({
      ...(category && {
        where: { categoryId: categoriesMap.get(category) },
      }),
    });

    const totalPages = Math.ceil(totalItems / take);

    return {
      currentPage: page,
      totalPages,
      categoriesMap,
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
