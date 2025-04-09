"use server";

import { auth } from "@/config/auth.config";
import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export const setTransactionId = async ({
  orderId: id,
  transactionId,
}: {
  orderId: string;
  transactionId: string;
}) => {
  try {
    const session = await auth();

    const { id: userId } = session?.user ?? { id: undefined };

    if (!userId) {
      return {
        ok: false,
        message: "No está autenticado.",
      };
    }

    const updatedOrder = await prisma.order.update({
      where: { id, userId },
      data: { transactionId },
    });

    return {
      ok: true,
      updatedOrder,
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
