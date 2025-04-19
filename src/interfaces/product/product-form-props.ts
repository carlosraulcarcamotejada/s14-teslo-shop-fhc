import { ComponentPropsWithoutRef } from "react";
import { Category } from "@/interfaces/category/category";
import { Product } from "@/interfaces/product/product";
import { ProductImage } from "@/interfaces/product/product-image";

interface ProductFormProps extends ComponentPropsWithoutRef<"div"> {
  product: Product & { productImage?: ProductImage[] };
  categories: Category[];
}

export type { ProductFormProps };
