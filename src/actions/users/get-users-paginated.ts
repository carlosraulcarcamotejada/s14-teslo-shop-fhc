"use server";
import { Prisma } from "@prisma/client";
import prisma from "@/lib/prisma";
import { auth } from "@/config/auth.config";
import { PaginationArgs } from "@/interfaces/actions/pagination-args";
import { User } from "@/interfaces/user/user";
import { ApiResponse } from "@/interfaces/actions/api-response";

export const getUsersPaginated = async ({
  page = 1,
  take = 12,
}: PaginationArgs = {}): Promise<
  ApiResponse & { currentPage: number; totalPages: number; users: User[] }
> => {
  try {
    if (isNaN(Number(page))) page = 1;
    if (page < 1) page = 1;

    if (isNaN(Number(take))) take = 12;
    if (take < 1) take = 12;
    const session = await auth();

    if (!session?.user && session?.user.role !== "admin") {
      return {
        currentPage: 0,
        message: "Se nececitan permisos de aministrador",
        success: false,
        totalPages: 0,
        users: [],
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
      message: "Usuarios obtenidos exitosamente",
      success: true,
      totalPages,
      users: dataUser,
    };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return {
        code: error.code,
        currentPage: 0,
        message: `Prisma error: ${error.message}`,
        success: false,
        totalPages: 0,
        users: [],
      };
    } else if (error instanceof Error) {
      return {
        currentPage: 0,
        message: error.message,
        success: false,
        totalPages: 0,
        users: [],
      };
    } else {
      return {
        currentPage: 0,
        message: "No hay productos en el pedido",
        success: false,
        totalPages: 0,
        users: [],
      };
    }
  }
};
