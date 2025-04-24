"use server";
import { ErrorPrisma } from "@/interfaces/actions/error-prisma";
import { Type } from "@/interfaces/type/type";
import { TypeOption } from "@/interfaces/type/type-option";
import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export const getTypes = async (): Promise<ErrorPrisma & { types: Type[] }> => {
  try {
    const types = await prisma.type.findMany({
      orderBy: { name: "asc" },
    });

    const typeData = types.map(({ id, name }) => ({
      id,
      name: name as TypeOption,
    }));

    return {
      ok: true,
      types: typeData,
    };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return {
        code: error.code,
        message: `Prisma error: ${error.message}`,
        ok: false,
        types: [],
      };
    } else if (error instanceof Error) {
      return {
        message: error.message,
        ok: false,
        types: [],
      };
    } else {
      return {
        message: "An unknown error occurred.",
        ok: false,
        types: [],
      };
    }
  }
};
