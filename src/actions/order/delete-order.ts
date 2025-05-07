"use server";
import { revalidatePath } from "next/cache";
import { Prisma } from "@prisma/client";
import prisma from "@/lib/prisma";
import { ApiResponse } from "@/interfaces/actions/api-response";
import { auth } from "@/config/auth.config";
import { DeleteOrderArgs } from "@/interfaces/actions/delete-order-args";

export const deleteOrder = async ({
  orderId,
}: DeleteOrderArgs): Promise<ApiResponse> => {
  try {
    const session = await auth();

    if (!session?.user) {
      return {
        message: "Debe de estar autenticado",
        success: false,
      };
    }

    const order = await prisma.order.findFirst({
      where: { id: orderId, userId: session?.user?.id ?? "" },
    });

    if (order?.isPaid) {
      return {
        message: "La orden ya fue pagada",
        success: false,
      };
    }

    const deletedOrderData = await prisma.orderAddress.deleteMany({
      where: { orderId },
    });

    if (!deletedOrderData) {
      return {
        message: "No se pudo borrar la orden",
        success: false,
      };
    }

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
      message: "orden eliminada exitosamente",
      success: true,
    };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return {
        code: error.code, // PrismaClientKnownRequestError tiene un código de error
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
