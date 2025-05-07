"use server";
import { Prisma } from "@prisma/client";
import prisma from "@/lib/prisma";
import { PaginationArgs } from "@/interfaces/actions/pagination-args";
import { Product } from "@/interfaces/product/product";
import { ApiResponse } from "@/interfaces/actions/api-response";
import { CategoryOption } from "@/interfaces/category/category-option";
import { TypeOption } from "@/interfaces/type/type-option";

export const getProductsPaginated = async ({
  category = "non-category",
  page = 1,
  take = 12,
}: PaginationArgs = {}): Promise<
  ApiResponse & {
    products: Product[];
    totalPages: number;
  }
> => {
  if (isNaN(Number(page))) page = 1;
  if (page < 1) page = 1;

  if (isNaN(Number(take))) take = 12;
  if (take < 1) take = 12;

  try {
    // 1. Obtener las categorias
    const categories = await prisma.category.findMany();

    const categoriesMap = new Map<string, string>();

    categories.forEach((category) => {
      categoriesMap.set(category.name, category.id);
    });

    // 2. Obetener los productos
    const productsData = await prisma.product.findMany({
      take,
      skip: (page - 1) * take,
      include: {
        productImage: { take: 2, select: { url: true } },
        category: {
          select: { name: true },
        },
        type: {
          select: { name: true },
        },
      },

      ...(category && {
        where: { categoryId: categoriesMap.get(category) },

        orderBy: {
          title: "asc",
        },
      }),
    });

    if (!productsData) {
      return {
        message: "No se pudo obtener los productos",
        success: false,
        products: [],
        totalPages: 0,
      };
    }

    // 3. Obtener el total de elementos
    const totalItems = await prisma.product.count({
      ...(category && {
        where: { categoryId: categoriesMap.get(category) },
      }),
    });

    // 4. Calcular el total de páginas
    const totalPages: number = Math.ceil(totalItems / take);

    const products: Product[] = productsData.map((product) => {
      const { category, type, productImage, ...restProduct } = product;

      return {
        ...restProduct,
        images: productImage.map((image) => image.url),
        categoryOption: category.name as CategoryOption,
        typeOption: type.name as TypeOption,
      };
    });

    return {
      message: "Productos obtenidos correctamente",
      products,
      success: true,
      totalPages,
    };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return {
        code: error.code,
        message: `Prisma error: ${error.message}`,
        products: [],
        success: false,
        totalPages: 0,
      };
    } else if (error instanceof Error) {
      return {
        message: error.message,
        products: [],
        success: false,
        totalPages: 0,
      };
    } else {
      return {
        message: "No hay productos en el pedido.",
        products: [],
        success: false,
        totalPages: 0,
      };
    }
  }
};
