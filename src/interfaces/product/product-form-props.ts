import { ComponentPropsWithoutRef } from "react";
import { Product } from "@/interfaces/product/product";

interface ProductFormProps extends ComponentPropsWithoutRef<"div"> {
  product: Product;
  categories: {
    id: string;
    name: string;
  }[];
}

export type { ProductFormProps };
