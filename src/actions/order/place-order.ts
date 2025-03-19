"use server";

import { auth } from "@/config/auth.config";
import { Address } from "@/interfaces/address";
import { ProductToOrder } from "@/interfaces/product-to-order";
import prisma from "@/lib/prisma";

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

  console.log({ subTotal, tax, total });

  try {
  } catch (error) {
    return {
      ok: false,
      message: "The order could not be saved.",
    };
  }
};
