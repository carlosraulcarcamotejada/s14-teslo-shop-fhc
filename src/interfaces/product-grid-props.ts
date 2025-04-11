import { ComponentPropsWithoutRef } from "react";
import { Product } from "@/interfaces/product";

interface ProductGridProps extends ComponentPropsWithoutRef<"div"> {
  products: Product[];
}

export type { ProductGridProps };
