"use server";

import { auth } from "@/config/auth.config";
import { DeleteOrder } from "@/interfaces/actions/delete-order";
import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const deleteOrder = async ({ orderId }: DeleteOrder) => {
  try {
    const session = await auth();

    if (!session?.user) {
      return {
        ok: false,
        message: "Debe de estar autenticado",
      };
    }

    const order = await prisma.order.findFirst({
      where: { id: orderId, userId: session?.user?.id ?? "" },
    });

    if (order?.isPaid) {
      return {
        ok: false,
        message: "La orden ya fue pagada",
      };
    }

    await prisma.orderAddress.deleteMany({ where: { orderId } });

    // Obtener la información de los productos
    const productsInOrder = await prisma.orderItem.findMany({
      where: {
        orderId,
      },
    });

    const updatedProductsPromises = productsInOrder.map((productInOrder) => {
      return prisma.product.update({
        where: {
          id: productInOrder.productId,
        },
        data: {
          inStock: { increment: productInOrder.quantity },
        },
      });
    });

    await Promise.all(updatedProductsPromises);

    const deletedProductsPromises = productsInOrder.map((productInOrder) => {
      return prisma.orderItem.delete({ where: { id: productInOrder.id } });
    });

    await Promise.all(deletedProductsPromises);

    await prisma.order.delete({ where: { id: orderId } });

    revalidatePath("/orders");

    return {
      ok: true,
      message: "orden eliminada",
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
