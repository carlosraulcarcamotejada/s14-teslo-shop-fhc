import { ComponentPropsWithoutRef } from "react";
import { Category } from "@/interfaces/category/category";
import { Product } from "@/interfaces/product/product";
import { ProductImage } from "@/interfaces/product/product-image";
import { Type } from "@/interfaces/type/type";

interface ProductFormProps extends ComponentPropsWithoutRef<"div"> {
  product: Product & { productImage?: ProductImage[] };
  categories: Category[];
  types: Type[];
}

export type { ProductFormProps };
