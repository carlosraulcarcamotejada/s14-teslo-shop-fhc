"use server";
import { Prisma } from "@prisma/client";
import prisma from "@/lib/prisma";
import { Country } from "@/interfaces/shared/country";
import { ApiResponse } from "@/interfaces/actions/api-response";

export const getCountries = async (): Promise<
  ApiResponse & { countries: Country[] }
> => {
  try {
    const countries = await prisma.country.findMany({
      orderBy: { name: "asc" },
    });

    if (!countries) {
      return {
        countries: [],
        message: "No se pudieron obtener los países",
        success: false,
      };
    }

    return {
      message: "Países obtenidos exitosamente",
      success: true,
      countries,
    };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return {
        code: error.code,
        countries: [],
        message: `Prisma error: ${error.message}`,
        success: false,
      };
    } else if (error instanceof Error) {
      return {
        countries: [],
        message: error.message,
        success: false,
      };
    } else {
      return {
        countries: [],
        message: "Se produjo un error desconocido",
        success: false,
      };
    }
  }
};
