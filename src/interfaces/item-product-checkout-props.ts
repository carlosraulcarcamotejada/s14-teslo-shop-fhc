import { ComponentPropsWithoutRef } from "react";
import { ProductInCart } from "./product/product-in-cart";

interface ItemProductCheckoutProps extends ComponentPropsWithoutRef<"div"> {
  product: ProductInCart;
}

export type { ItemProductCheckoutProps };
