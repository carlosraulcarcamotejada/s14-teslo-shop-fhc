import { ComponentPropsWithoutRef } from "react";
import { Product } from "@/seed/seed";

interface ProductFormProps extends ComponentPropsWithoutRef<"div"> {
  product: Product;
  categories: {
    id: string;
    name: string;
  }[];
}

export type { ProductFormProps };
