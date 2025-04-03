"use server";

import { auth } from "@/config/auth.config";
import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export const getUsers = async () => {
  try {
    const session = await auth();

    if (!session?.user && session?.user.role !== "admin") {
      return {
        ok: false,
        message: "Permisos de aministrador necesarios.",
        users: [],
      };
    }

    const users = await prisma.user.findMany({ orderBy: { name: "desc" } });

    return {
      ok: true,
      users,
    };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return {
        ok: false,
        message: `Prisma error: ${error.message}`,
        users: [],
        code: error.code, // PrismaClientKnownRequestError tiene un código de error
      };
    } else if (error instanceof Error) {
      return {
        ok: false,
        message: error.message,
        users: [],
      };
    } else {
      return {
        ok: false,
        users: [],
        message: "An unknown error occurred.",
      };
    }
  }
};
