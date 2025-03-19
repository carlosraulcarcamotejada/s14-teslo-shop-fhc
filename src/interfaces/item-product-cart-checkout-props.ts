import { ComponentPropsWithoutRef } from "react";
import { ProductInCart } from "@/interfaces/product-in-cart";

interface ItemProductCartCheckoutProps extends ComponentPropsWithoutRef<"div"> {
  product: ProductInCart;
}

export type { ItemProductCartCheckoutProps };
