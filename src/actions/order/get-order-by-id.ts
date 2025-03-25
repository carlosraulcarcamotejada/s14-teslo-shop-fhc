"use server";
import { auth } from "@/config/auth.config";
import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export const getOrderById = async (id: string) => {
  try {
    const session = await auth();

    if (!session?.user) {
      return {
        ok: false,
        message: "Debe de estar autenticado",
      };
    }

    const order = await prisma.order.findUnique({
      where: { id },

      // include: { productImage: { select: { url: true } } },
      include: {
        OrderAddress: true,
        OrderItem: {
          select: {
            price: true,
            quantity: true,
            size: true,
            product: {
              select: {
                id: true,
                slug: true,
                title: true,
                productImage: {
                  select: {
                    url: true,
                  },
                  take: 1,
                },
              },
            },
          },
        },
      },
    });

    // console.log(order)

    if (!order) {
      throw `${id} no existe`;
    }

    if (session.user.role === "user" && session.user.id !== order.userId) {
      throw `${id} no pertenece al usuario`;
    }

    return {
      ok: true,
      order,
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
