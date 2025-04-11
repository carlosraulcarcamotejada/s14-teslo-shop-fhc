import { ComponentPropsWithoutRef } from "react";
import { Order } from "@/interfaces/order/order";

interface OrdersTableProps extends ComponentPropsWithoutRef<"div"> {
  data?: Order[];
  totalPages?: number;
}

export type { OrdersTableProps };
