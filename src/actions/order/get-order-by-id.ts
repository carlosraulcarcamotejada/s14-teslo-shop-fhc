"use server";
import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { auth } from "@/config/auth.config";
import { GetOrderByIdArgs } from "@/interfaces/actions/get-order-by-id-args";
// import { ApiResponse } from "@/interfaces/actions/api-response";

export const getOrderById = async ({
  id,
}: GetOrderByIdArgs) => {
  try {
    const session = await auth();

    if (!session?.user) {
      return {
        message: "Debe de estar autenticado",
        success: false,
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
                categoryId: true,
                typeId: true,
                category: true,
                type: true,
                productImage: {
                  select: {
                    url: true,
                  },
                  take: 1,
                },
              },
              include: {
                category: {
                  select: { name: true },
                },
                type: {
                  select: { name: true },
                },
              },
            },
          },
        },
      },
    });

   

    if (!order) {
      throw `${id} no existe`;
    }

    if (session.user.role === "user" && session.user.id !== order.userId) {
      throw `${id} no pertenece al usuario`;
    }

    return {
      message: "Orden obtenida exitosamente",
      order,
      success: true,
    };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return {
        code: error.code,
        message: `Prisma error: ${error.message}`,
        success: false,
      };
    } else if (error instanceof Error) {
      return {
        message: error.message,
        success: false,
      };
    } else {
      return {
        message: "Se produjo un error desconocido",
        success: false,
      };
    }
  }
};
