"use server";
import prisma from "@/lib/prisma";
import { Country } from "@/seed/seed";
import { Prisma } from "@prisma/client";

export const getCountries = async (): Promise<{
  ok: boolean;
  countries: Country[];
  message?: string;
  code?: string;
}> => {
  try {
    const countries = await prisma.country.findMany({
      orderBy: { name: "asc" },
    });
    return { ok: true, countries };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return {
        code: error.code,
        message: `Prisma error: ${error.message}`,
        ok: false,
        countries: [],
      };
    } else if (error instanceof Error) {
      return {
        message: error.message,
        ok: false,
        countries: [],
      };
    } else {
      return {
        message: "An unknown error occurred.",
        ok: false,
        countries: [],
      };
    }
  }
};
