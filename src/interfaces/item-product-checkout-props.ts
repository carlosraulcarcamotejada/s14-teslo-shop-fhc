import { ComponentPropsWithoutRef } from "react";
import { Product } from "@/seed/seed";

interface ItemProductCheckoutProps extends ComponentPropsWithoutRef<"div"> {
  product: Product;
}

export type { ItemProductCheckoutProps };
