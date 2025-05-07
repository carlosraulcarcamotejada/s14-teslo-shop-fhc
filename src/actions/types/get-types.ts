"use server";
import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { ApiResponse } from "@/interfaces/actions/api-response";
import { Type } from "@/interfaces/type/type";
import { TypeOption } from "@/interfaces/type/type-option";

export const getTypes = async (): Promise<ApiResponse & { types: Type[] }> => {
  try {
    const typesData = await prisma.type.findMany({
      orderBy: { name: "asc" },
    });

    if (!typesData) {
      return {
        message: "No se pudieron obtener los tipos",
        success: false,
        types: [],
      };
    }

    const types = typesData.map(({ id, name }) => ({
      id,
      name: name as TypeOption,
    }));

    return {
      message: "Tipos de producto obtenidos exitosamente",
      success: true,
      types,
    };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return {
        code: error.code,
        message: `Prisma error: ${error.message}`,
        success: false,
        types: [],
      };
    } else if (error instanceof Error) {
      return {
        message: error.message,
        success: false,
        types: [],
      };
    } else {
      return {
        message: "No hay productos en el pedido",
        success: false,
        types: [],
      };
    }
  }
};
