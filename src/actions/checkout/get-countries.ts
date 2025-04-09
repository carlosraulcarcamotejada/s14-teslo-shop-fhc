"use server";
import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export const getCountries = async () => {
  try {
    const countries = await prisma.country.findMany({
      orderBy: { name: "asc" },
    });
    return countries;
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
