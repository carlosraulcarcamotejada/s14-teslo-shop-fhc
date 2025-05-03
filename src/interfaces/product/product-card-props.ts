import { ComponentPropsWithoutRef } from "react";
import { Product } from "@/interfaces/product/product";

interface ProductCardProps extends ComponentPropsWithoutRef<"div"> {
  product: Product;
}

export type { ProductCardProps };
