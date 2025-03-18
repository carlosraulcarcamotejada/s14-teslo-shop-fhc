import { ComponentPropsWithoutRef } from "react";

interface StatusOrdersProps extends ComponentPropsWithoutRef<"div"> {
  description?: string;
  title: "Pendiente de pago" | "Pagado";
}

export type { StatusOrdersProps };
