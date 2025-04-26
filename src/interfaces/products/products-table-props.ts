import { ComponentPropsWithoutRef } from "react";
import { Product } from "@/interfaces/product/product";
import { TableOptions } from "@tanstack/react-table";

interface ProductTableProps extends ComponentPropsWithoutRef<"div"> {
  data?: Product[];
  totalPages?: number;
  tableOptions?: TableOptions<Product>;
}

export type { ProductTableProps };
