"use server";
import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { auth } from "@/config/auth.config";
import { ApiResponse } from "@/interfaces/actions/api-response";
import { GetUserByIdArgs } from "@/interfaces/actions/get-user-by-id-args";
import { User } from "@/interfaces/user/user";

export const getUserById = async ({
  id,
}: GetUserByIdArgs): Promise<ApiResponse & { user?: User }> => {
  try {
    const session = await auth();

    if (!session?.user) {
      return {
        message: "No está autenticado.",
        success: false,
      };
    }

    const user = await prisma.user.findUnique({ where: { id } });

    if (!user) {
      return {
        message: "Usuario no encontrado",
        success: false,
      };
    }

    return {
      message: "Usuario obtenido exitosamente",
      success: true,
      user,
    };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return {
        success: false,
        message: `Prisma error: ${error.message}`,
        code: error.code,
      };
    } else if (error instanceof Error) {
      return {
        success: false,
        message: error.message,
      };
    } else {
      return {
        success: false,
        message: "No hay productos en el pedido",
      };
    }
  }
};
