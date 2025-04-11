import { ComponentPropsWithoutRef } from "react";
import { Product } from "@/interfaces/product";

interface ProductTableProps extends ComponentPropsWithoutRef<"div"> {
  data?: Product[];
  totalPages?: number;
}

export type { ProductTableProps };
