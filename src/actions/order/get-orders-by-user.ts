"use server";

import { Prisma } from "@prisma/client";
import prisma from "@/lib/prisma";
import { auth } from "@/config/auth.config";
import { Order } from "@/interfaces/order";
import { PaginationOptions } from "@/interfaces/pagination-options";

export const getOrdersByUserPaginated = async ({
  page = 1,
  take = 12,
}: PaginationOptions = {}): Promise<
  | {
      ok: boolean;
      message: string;
      orders: Order[];
      totalPages: number;
    }
  | {
      ok: boolean;
      message: string;
      orders: Order[];
      code?: string;
      totalPages: number;
    }
> => {
  try {
    const session = await auth();

    if (!session?.user) {
      return {
        ok: false,
        message: "Debe de estar autenticado",
        orders: [],
        totalPages: 0,
      };
    }

    if (isNaN(Number(page))) page = 1;
    if (page < 1) page = 1;

    if (isNaN(Number(take))) take = 12;
    if (take < 1) take = 12;

    // 1. Obtener las ordenes
    const orders = await prisma.order.findMany({
      ...(session.user.role !== "admin" && {
        where: { userId: session.user.id },
      }),
      take,
      skip: (page - 1) * take,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        OrderAddress: {
          select: {
            names: true,
            lastNames: true,
          },
        },
      },
    });

    // 3. Obtener el total de elementos
    const totalItems = await prisma.order.count();

    // 4. Calcular el total de páginas
    const totalPages = Math.ceil(totalItems / take);

    const orderData: Order[] = orders?.map((order) => ({
      completeName: `${order.OrderAddress?.names} ${order.OrderAddress?.lastNames}`,
      id: order.id,
      isPaid: order.isPaid,
      userId: order.userId,
    }));

    return {
      ok: true,
      orders: orderData,
      message: "",
      totalPages,
    };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return {
        ok: false,
        message: `Prisma error: ${error.message}`,
        code: error.code, // PrismaClientKnownRequestError tiene un código de error
        orders: [],
        totalPages: 0,
      };
    } else if (error instanceof Error) {
      return {
        ok: false,
        message: error.message,
        orders: [],
        totalPages: 0,
      };
    } else {
      return {
        ok: false,
        message: "An unknown error occurred.",
        orders: [],
        totalPages: 0,
      };
    }
  }
};
