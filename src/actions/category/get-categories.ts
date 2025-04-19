"use server";
import { ErrorPrisma } from "@/interfaces/actions/error-prisma";
import { Category } from "@/interfaces/category/category";
import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export const getCategories = async (): Promise<
  ErrorPrisma & { categories: Category[] }
> => {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { name: "asc" },
    });

    return {
      ok: true,
      categories,
    };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return {
        code: error.code,
        message: `Prisma error: ${error.message}`,
        ok: false,
        categories: [],
      };
    } else if (error instanceof Error) {
      return {
        message: error.message,
        ok: false,
        categories: [],
      };
    } else {
      return {
        message: "An unknown error occurred.",
        ok: false,
        categories: [],
      };
    }
  }
};
