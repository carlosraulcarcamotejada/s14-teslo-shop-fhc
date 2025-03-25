import { ComponentPropsWithoutRef } from "react";

interface StatusOrdersProps extends ComponentPropsWithoutRef<"div"> {
  description?: string;
  isPaid?: boolean;
}

export type { StatusOrdersProps };
