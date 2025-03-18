import { ComponentPropsWithoutRef } from "react";
import { Product } from "@/seed/seed";

interface ProductGridProps extends ComponentPropsWithoutRef<"div"> {
  products: Product[];
}

export type { ProductGridProps };
