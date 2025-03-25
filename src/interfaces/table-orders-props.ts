import { ComponentPropsWithoutRef } from "react";
import { Order } from "@/interfaces/order";

interface TableOrdersProps extends ComponentPropsWithoutRef<"div"> {
  data?: Order[];
}

export type { TableOrdersProps };
