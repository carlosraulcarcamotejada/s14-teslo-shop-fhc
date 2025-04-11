import { ComponentPropsWithoutRef } from "react";
import { Product } from "@/interfaces/product";

interface ProductGridItemProps extends ComponentPropsWithoutRef<"div"> {
  product: Product;
}

export type { ProductGridItemProps };
