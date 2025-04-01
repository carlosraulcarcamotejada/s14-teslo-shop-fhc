"use server";

import { auth } from "@/config/auth.config";
import { Address } from "@/interfaces/address";
import { ProductToOrder } from "@/interfaces/product-to-order";
import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export const placeOrder = async (
  productsToOrder: ProductToOrder[],
  address: Address
) => {
  console.log("placeOrder");
  const session = await auth();

  const userId = session?.user.id;

  // Verificar sesión de usuario
  if (!userId) {
    return {
      ok: false,
      message: "There is no user logged in.",
    };
  }

  // Verificar que hayan productos en la orden
  if (productsToOrder.length === 0) {
    return {
      ok: false,
      message: "No products in order.",
    };
  }

  // Obtener la información de los productos
  const products = await prisma.product.findMany({
    where: {
      id: {
        in: productsToOrder.map((productInOrder) => productInOrder.id),
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
              data: productsToOrder.map((productToOrder) => ({
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
      });

      const { country, address2, saveForm, ...restAddress } = address;
      const orderAddress = await tx.orderAddress.create({
        data: {
          ...restAddress,
          saveForm: address.saveForm ?? false,
          address2: address.address2 ?? "",
          countryId: address.country,
          orderId: order.id,
        },
      });

      // 3. crear dirección de la orden

      return {
        order,
        orderAddress,
        updatedProducts: [],
      };
    });

    return {
      ok: true,
      order: prismaTx.order,
      prismaTx,
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
