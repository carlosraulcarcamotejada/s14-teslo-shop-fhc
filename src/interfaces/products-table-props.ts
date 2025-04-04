import { ComponentPropsWithoutRef } from "react";
import { Product } from "../seed/seed";

interface ProductTableProps extends ComponentPropsWithoutRef<"div"> {
  data?: Product[];
  totalPages?: number;
}

export type { ProductTableProps };
