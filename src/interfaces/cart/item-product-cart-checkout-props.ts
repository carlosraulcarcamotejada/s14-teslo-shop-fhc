import { ComponentPropsWithoutRef } from "react";
import { ProductInCart } from "@/interfaces/product/product-in-cart";

interface ItemProductCartCheckoutProps extends ComponentPropsWithoutRef<"div"> {
  productInCart: ProductInCart;
}

export type { ItemProductCartCheckoutProps };
