import { ComponentPropsWithoutRef } from "react";

interface OrderStatusProps extends ComponentPropsWithoutRef<"div"> {
  description?: string;
  isPaid?: boolean;
}

export type { OrderStatusProps };
