import { ComponentPropsWithoutRef } from "react";
import { Category } from "@/interfaces/category/category";
import { Type } from "@/interfaces/type/type";
import { ProductFormValues } from "@/interfaces/product/product-form-values";

interface ProductFormProps extends ComponentPropsWithoutRef<"div"> {
  product?: ProductFormValues;
  categories?: Category[];
  types?: Type[];
}

export type { ProductFormProps };
