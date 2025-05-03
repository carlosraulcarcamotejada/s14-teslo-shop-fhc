import { ComponentPropsWithoutRef } from "react";
import { Product } from "@/interfaces/product/product";

interface ProductsGridProps extends ComponentPropsWithoutRef<"div"> {
  products: Product[];
}

export type { ProductsGridProps };
