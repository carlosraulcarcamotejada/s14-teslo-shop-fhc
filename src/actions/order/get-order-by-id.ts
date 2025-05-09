"use server";
import { Prisma } from "@prisma/client";
import prisma from "@/lib/prisma";
import { auth } from "@/config/auth.config";
import { GetOrderByIdArgs } from "@/interfaces/actions/get-order-by-id-args";
import { ApiResponse } from "@/interfaces/actions/api-response";
import { GetOrderByIDPrismaResponse } from "@/interfaces/order/get-order-by-id-prisma-response";

export const getOrderById = async ({
  orderId,
}: GetOrderByIdArgs): Promise<
  ApiResponse & {
    order?: GetOrderByIDPrismaResponse;
  }
> => {
  try {
    const session = await auth();

    if (!session?.user) {
      return {
        message: "Debe de estar autenticado",
        success: false,
      };
    }

    const order = await prisma.order.findUnique({
      where: { id: orderId },
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

                category: {
                  select: {
                    name: true,
                  },
                },
                type: {
                  select: {
                    name: true,
                  },
                },
                productImage: {
                  select: {
                    url: true,
                  },
                  take: 1,
                  orderBy: {
                    id: "asc",
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!order) {
      return {
        message: `Orden con ${orderId} no existe.`,
        success: false,
      };
    }

    if (session?.user?.role === "user" && session.user.id !== order.userId) {
      return {
        message: `La orden ${orderId} no pertenece al usuario`,
        success: false,
      };
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
