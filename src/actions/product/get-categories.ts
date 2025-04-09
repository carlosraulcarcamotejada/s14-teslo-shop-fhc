"use server";
import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export const getCategories = async (): Promise<{
  ok: boolean;
  categories: {
    id: string;
    name: string;
  }[];
  code?: string;
  message?: string;
}> => {
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
