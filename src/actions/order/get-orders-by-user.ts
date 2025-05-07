"use server";

import { Prisma } from "@prisma/client";
import prisma from "@/lib/prisma";
import { ApiResponse } from "@/interfaces/actions/api-response";
import { auth } from "@/config/auth.config";
import { Order } from "@/interfaces/order/order";
import { PaginationArgs } from "@/interfaces/actions/pagination-args";

export const getOrdersByUserPaginated = async ({
  page = 1,
  take = 12,
}: PaginationArgs = {}): Promise<
  ApiResponse & { orders: Order[]; totalPages: number }
> => {
  try {
    const session = await auth();

    if (!session?.user) {
      return {
        message: "Debe de estar autenticado",
        orders: [],
        success: false,
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
      message: "Ordenes del usuario obtenidas exitosamente",
      orders: orderData,
      success: true,
      totalPages,
    };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return {
        code: error.code,
        message: `Prisma error: ${error.message}`,
        orders: [],
        success: false,
        totalPages: 0,
      };
    } else if (error instanceof Error) {
      return {
        message: error.message,
        orders: [],
        success: false,
        totalPages: 0,
      };
    } else {
      return {
        message: "Se produjo un error desconocido",
        orders: [],
        success: false,
        totalPages: 0,
      };
    }
  }
};
