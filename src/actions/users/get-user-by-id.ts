"use server";

import { auth } from "@/config/auth.config";
import { GetUserById } from "@/interfaces/get-user-by-id";
import { User } from "@/interfaces/user/user";
import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export const getUserById = async ({
  id,
}: GetUserById): Promise<{
  user: User | null;
  ok: boolean;
  message?: string;
  code?: string;
}> => {
  try {
    const session = await auth();

    if (!session?.user) {
      return {
        ok: false,
        message: "No está autenticado.",
        user: null,
      };
    }

    const user = await prisma.user.findUnique({ where: { id } });

    if (!user) {
      return {
        ok: false,
        message: "Usuario no encontrado",
        user: null,
      };
    }

    return {
      ok: true,
      user,
    };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return {
        ok: false,
        message: `Prisma error: ${error.message}`,
        code: error.code, // PrismaClientKnownRequestError tiene un código de error
        user: null,
      };
    } else if (error instanceof Error) {
      return {
        ok: false,
        message: error.message,
        user: null,
      };
    } else {
      return {
        ok: false,
        message: "An unknown error occurred.",
        user: null,
      };
    }
  }
};
