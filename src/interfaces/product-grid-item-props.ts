import { ComponentPropsWithoutRef } from "react";
import { Product } from "@/seed/seed";

interface ProductGridItemProps extends ComponentPropsWithoutRef<"div"> {
  product: Product;
}

export type { ProductGridItemProps };
