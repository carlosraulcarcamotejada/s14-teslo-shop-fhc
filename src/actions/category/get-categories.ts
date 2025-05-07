"use server";
import { Prisma } from "@prisma/client";
import prisma from "@/lib/prisma";
import { ApiResponse } from "@/interfaces/actions/api-response";
import { Category } from "@/interfaces/category/category";
import { CategoryOption } from "@/interfaces/category/category-option";

export const getCategories = async (): Promise<
  ApiResponse & { categories: Category[] }
> => {
  try {
    const categoriesData = await prisma.category.findMany({
      orderBy: { name: "asc" },
    });

    if (!categoriesData) {
      return {
        message: "No se pudieron obtener las categorías",
        success: false,
        categories: [],
      };
    }

    const categories = categoriesData.map(({ id, name }) => ({
      id,
      name: name as CategoryOption,
    }));

    return {
      categories,
      message: "Categorías obtenidas exitosamente",
      success: true,
    };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return {
        code: error.code,
        categories: [],
        message: `Prisma error: ${error.message}`,
        success: false,
      };
    } else if (error instanceof Error) {
      return {
        categories: [],
        message: error.message,
        success: false,
      };
    } else {
      return {
        categories: [],
        message: "Se produjo un error desconocido",
        success: false,
      };
    }
  }
};
