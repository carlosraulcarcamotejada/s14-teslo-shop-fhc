"use server";

import { Prisma } from "@prisma/client";
import prisma from "@/lib/prisma";
import { PaginationOptions } from "@/interfaces/components/pagination-options";
import { Product } from "@/interfaces/product/product";
import { CategoryOption } from "@/interfaces/category/category-option";
import { Type } from "@/interfaces/type/type";

export const getProductsPaginated = async ({
  category,
  page = 1,
  take = 12,
}: PaginationOptions = {}): Promise<
  | {
      categoriesMap: Map<CategoryOption, string>;
      products: Product[];
      totalPages: number;
    }
  | {
      code?: string;
      message: string;
      ok: boolean;
      products: Product[];
      totalPages: number;
      categoriesMap: Map<CategoryOption, string>;
    }
> => {
  if (isNaN(Number(page))) page = 1;
  if (page < 1) page = 1;

  if (isNaN(Number(take))) take = 12;
  if (take < 1) take = 12;

  try {
    // 1. Obtener las categorias
    const categories = await prisma.category.findMany();

    const categoriesMap = new Map<CategoryOption, string>();

    categories.forEach((category) => {
      categoriesMap.set(category.name as CategoryOption, category.id);
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

    // 3. Obtener el total de elementos
    const totalItems = await prisma.product.count({
      ...(category && {
        where: { categoryId: categoriesMap.get(category) },
      }),
    });

    // 4. Calcular el total de páginas
    const totalPages = Math.ceil(totalItems / take);

    return {
      totalPages,
      categoriesMap,
      products: products.map((product) => {
        const { categoryId, typeId, productImage, ...restProduct } = product;

        return {
          images: productImage.map((image) => image.url),
          category: categoryId as CategoryOption,
          type: typeId as Type,
          ...restProduct,
        };
      }),
    };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return {
        code: error.code,
        message: `Prisma error: ${error.message}`,
        ok: false,
        products: [],
        totalPages: 0,
        categoriesMap: new Map(),
      };
    } else if (error instanceof Error) {
      return {
        message: error.message,
        ok: false,
        products: [],
        totalPages: 0,
        categoriesMap: new Map(),
      };
    } else {
      return {
        message: "An unknown error occurred.",
        ok: false,
        products: [],
        totalPages: 0,
        categoriesMap: new Map(),
      };
    }
  }
};
