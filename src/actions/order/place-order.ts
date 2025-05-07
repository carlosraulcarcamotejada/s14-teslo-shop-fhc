"use server";

import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { ApiResponse } from "@/interfaces/actions/api-response";
import { auth } from "@/config/auth.config";
import { Order } from "@/interfaces/order/order";
import { PlaceOrderArgs } from "@/interfaces/actions/place-order-args";

export const placeOrder = async ({
  address,
  productsToOrder,
}: PlaceOrderArgs): Promise<ApiResponse & { order?: Order }> => {
  const session = await auth();

  const userId = session?.user.id;

  // Verificar sesión de usuario
  if (!userId) {
    return {
      message: "El usuario no está autenticado",
      success: false,
    };
  }

  // Verificar que hayan productos en la orden
  if (productsToOrder.length === 0) {
    return {
      success: false,
      message: "No hay productos en el pedido",
    };
  }

  const productIds = productsToOrder
    .map((p) => p.id)
    .filter((id): id is string => typeof id === "string");

  // Obtener la información de los productos
  const products = await prisma.product.findMany({
    where: {
      id: {
        in: productIds,
      },
    },
  });

  // Calcular los montos *Encabezado*
  const totalItemsInOrder: number = productsToOrder.reduce(
    (accum, product) => accum + product.quantity,
    0
  );

  // los totales de tax, sub-total y total
  const { subTotal, tax, total } = productsToOrder.reduce(
    (totals, productToOrder) => {
      const productQuantity = productToOrder.quantity;
      const product = products.find(
        (product) => product.id === productToOrder.id
      );

      if (!product) {
        throw new Error(`${productToOrder.id} no existe - 500`);
      }

      const subTotal: number = product.price * productQuantity;

      totals.subTotal += subTotal;
      totals.tax += subTotal * 0.15;
      totals.total += subTotal * 1.15;

      return totals;
    },
    { subTotal: 0, total: 0, tax: 0 }
  );

  try {
    // crear transacción de base de datos
    const prismaTx = await prisma.$transaction(async (tx) => {
      // 1. actualizar el store del producto
      const updatedProductsPromises = products.map((product) => {
        // acumular los valores
        const productQuantity = productsToOrder
          .filter((productToOrder) => productToOrder.id === product.id)
          .reduce((acc, item) => item.quantity + acc, 0);

        if (productQuantity === 0) {
          throw new Error(`${product.id} no tiene cantidad definida`);
        }

        return tx.product.update({
          where: { id: product.id },
          data: {
            inStock: { decrement: productQuantity },
          },
        });
      });

      const updatedProducts = await Promise.all(updatedProductsPromises);
      //  Verificar valores negativos en las exitstencias = no hay stock
      updatedProducts.forEach((updatedProduct) => {
        if (updatedProduct.inStock < 0) {
          throw new Error(
            `${updatedProduct.title}, No hay sufuciernte inventario`
          );
        }
      });

      // 2. crear orden - Encabezado
      const order = await tx.order.create({
        data: {
          itemsInOrder: totalItemsInOrder,
          OrderItem: {
            createMany: {
              data: productsToOrder
                .filter(
                  (p): p is typeof p & { id: string } =>
                    typeof p.id === "string"
                )
                .map((productToOrder) => ({
                  quantity: productToOrder.quantity,
                  size: productToOrder.selectedSize,
                  productId: productToOrder.id,
                  price:
                    products.find((product) => product.id === productToOrder.id)
                      ?.price ?? 0,
                })),
            },
          },

          subTotal,
          tax,
          total,
          userId,
        },
        include: {
          user: {
            select: {
              name: true,
            },
          },
        },
      });

      const { address2, country, saveForm, ...restAddress } = address;
      const orderAddress = await tx.orderAddress.create({
        data: {
          address2: address2 ?? "",
          countryId: country,
          orderId: order.id,
          saveForm: saveForm ?? false,
          ...restAddress,
        },
      });

      // 3. crear dirección de la orden

      return {
        order,
        orderAddress,
        updatedProducts: [],
      };
    });

    const {
      user: { name },
      ...restOrder
    } = prismaTx.order;

    const order: Order = {
      ...restOrder,
      completeName: name,
    };

    return {
      success: true,
      order,
      message: "Orden colocada exitosamente",
      // prismaTx,
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
