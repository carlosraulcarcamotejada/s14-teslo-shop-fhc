import { ComponentPropsWithoutRef } from "react";
import { ProductInCart } from "@/interfaces/product/product-in-cart";

interface ItemProductCartProps extends ComponentPropsWithoutRef<"div"> {
  product: ProductInCart;
}

export type { ItemProductCartProps };
