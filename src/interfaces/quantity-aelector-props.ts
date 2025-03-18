import { ComponentPropsWithoutRef, Dispatch, SetStateAction } from "react";

interface QuantitySelectorProps extends ComponentPropsWithoutRef<"div"> {
  quantityLimit?: number;
  quantity?: number;
  setQuantity: Dispatch<SetStateAction<number>>;
  size?: "md" | "lg" | "auto";
  title?: string;
}

export type { QuantitySelectorProps };
