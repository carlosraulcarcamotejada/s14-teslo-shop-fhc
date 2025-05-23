import { ComponentPropsWithoutRef } from "react";
import { ProductInCart } from "@/interfaces/product/product-in-cart";

interface ItemProductCartOrdersProps extends ComponentPropsWithoutRef<"div"> {
  productInCartOrders: ProductInCart;
}

export type { ItemProductCartOrdersProps };
