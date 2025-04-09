"use server";

import { Prisma } from "@prisma/client";
import { auth } from "@/config/auth.config";
import prisma from "@/lib/prisma";
import { PaginationOptions } from "@/interfaces/pagination-options";
import { User } from "@/interfaces/user";

export const getUsersPaginated = async ({
  page = 1,
  take = 12,
}: PaginationOptions = {}): Promise<
  | { currentPage: number; totalPages: number; users: User[] }
  | {
      code?: string;
      message: string;
      ok: boolean;
      totalPages: number;
      users: User[];
    }
> => {
  try {
    if (isNaN(Number(page))) page = 1;
    if (page < 1) page = 1;

    if (isNaN(Number(take))) take = 12;
    if (take < 1) take = 12;
    const session = await auth();

    if (!session?.user && session?.user.role !== "admin") {
      return {
        ok: false,
        message: "Permisos de aministrador necesarios.",
        users: [],
        totalPages: 0,
        currentPage: 0,
      };
    }

    // 1. Obtener los usuarios
    const users = await prisma.user.findMany({ orderBy: { name: "desc" } });

    const dataUser: User[] = users?.map((user) => user);

    // 3. Obtener el total de elementos
    const totalItems = await prisma.user.count();

    // 4. Calcular el total de páginas
    const totalPages = Math.ceil(totalItems / take);

    return {
      currentPage: 0,
      ok: true,
      totalPages,
      users: dataUser,
    };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return {
        code: error.code, // PrismaClientKnownRequestError tiene un código de error
        currentPage: 0,
        message: `Prisma error: ${error.message}`,
        ok: false,
        totalPages: 0,
        users: [],
      };
    } else if (error instanceof Error) {
      return {
        currentPage: 0,
        message: error.message,
        ok: false,
        totalPages: 0,
        users: [],
      };
    } else {
      return {
        currentPage: 0,
        message: "An unknown error occurred.",
        ok: false,
        totalPages: 0,
        users: [],
      };
    }
  }
};
