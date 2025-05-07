"use server";
import { Prisma } from "@prisma/client";
import prisma from "@/lib/prisma";
import { auth } from "@/config/auth.config";
import { UpdateTransactionIdArgs } from "@/interfaces/actions/update-transaction-id-args";
import { ApiResponse } from "@/interfaces/actions/api-response";
import { Order } from "@/interfaces/order/order";

export const updateTransactionId = async ({
  orderId: id,
  transactionId,
}: UpdateTransactionIdArgs): Promise<
  ApiResponse & { updatedOrder?: Order }
> => {
  try {
    const session = await auth();

    const { id: userId } = session?.user ?? { id: undefined };

    if (!userId) {
      return {
        message: "El usuario no está autenticado",
        success: false,
      };
    }

    const updatedOrderData = await prisma.order.update({
      where: { id, userId },
      data: { transactionId },
      include: {
        user: {
          select: {
            name: true,
          },
        },
      },
    });

    if (!updatedOrderData) {
      return {
        message: "La orden no pudo ser actualizada",
        success: false,
      };
    }

    const {
      user: { name },
      ...restUpdatedOrderData
    } = updatedOrderData;

    const updatedOrder: Order = {
      ...restUpdatedOrderData,
      completeName: name,
    };

    return {
      message: "Transanción actualizada (id)",
      success: true,
      updatedOrder,
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
        message: "No hay productos en el pedido",
        success: false,
      };
    }
  }
};
