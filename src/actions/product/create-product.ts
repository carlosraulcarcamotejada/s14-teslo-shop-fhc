"use server";

import { ErrorPrisma } from "@/interfaces/actions/error-prisma";
import { Prisma } from "@prisma/client";

export const createProduct = async (): Promise<ErrorPrisma> => {
  try {
    return {
      ok: true,
    };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return {
        code: error.code,
        message: `Prisma error: ${error.message}`,
        ok: false,
      };
    } else if (error instanceof Error) {
      return {
        message: error.message,
        ok: false,
      };
    } else {
      return {
        message: "An unknown error occurred.",
        ok: false,
      };
    }
  }
};
