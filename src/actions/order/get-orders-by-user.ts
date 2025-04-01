"use server";

import { auth } from "@/config/auth.config";
import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export const getOrdersByUser = async () => {
  try {
    const session = await auth();

    if (!session?.user) {
      return {
        ok: false,
        message: "Debe de estar autenticado",
      };
    }

    const orders = await prisma.order.findMany({
      ...(session.user.role !== "admin" && {
        where: { userId: session.user.id },
      }),
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

    return {
      ok: true,
      orders,
    };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return {
        ok: false,
        message: `Prisma error: ${error.message}`,
        code: error.code, // PrismaClientKnownRequestError tiene un código de error
      };
    } else if (error instanceof Error) {
      return {
        ok: false,
        message: error.message,
      };
    } else {
      return {
        ok: false,
        message: "An unknown error occurred.",
      };
    }
  }
};
