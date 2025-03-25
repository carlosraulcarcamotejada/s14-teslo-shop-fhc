import { ComponentPropsWithoutRef } from "react";
import { ProductInCart } from "@/interfaces/product-in-cart";

interface ProductsInCartOrdersProps extends ComponentPropsWithoutRef<"div"> {
  productsInCartOrders: ProductInCart[];
}

export type { ProductsInCartOrdersProps };
