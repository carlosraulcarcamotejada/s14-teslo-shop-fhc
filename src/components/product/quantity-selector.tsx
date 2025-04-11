"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { MinusIcon, PlusIcon } from "lucide-react";
import { useResponsive } from "@/hooks/use-responsive";
import { QuantitySelectorProps } from "@/interfaces/components/quantity-aelector-props";
import clsx from "clsx";

export const QuantitySelector = ({
  className,
  quantityLimit = 5,
  quantity = 1,
  setQuantity,
  size = "md",
  title,
  ...props
}: QuantitySelectorProps) => {
  //Funtion to change the value
  const onValueChange = (value: number = 1) => {
    setQuantity((prevVal) => {
      const newQuantity = prevVal + value;
      return newQuantity > 0 ? newQuantity : 0; // Evitar negativos
    });
  };
  const isDisableAddButton: boolean = quantity >= quantityLimit;

  const isDisableSubtractButton: boolean = quantity <= 1;

  const { isDesktop } = useResponsive();

  return (
    <div {...props} className={cn("flex flex-col gap-y-4", className)}>
      {title && <h3 className="font-bold">Cantidad:</h3>}
      <div className="flex gap-x-4#">
        <Button
          className="w-10 rounded-r-none"
          onClick={() => onValueChange(-1)}
          disabled={isDisableSubtractButton}
          size={
            ["lg", "md", "sm", "default", "icon"].includes(size) ? size : "sm"
          }
          variant="default"
        >
          <MinusIcon />
        </Button>
        <span
          className={clsx(
            "bg-accent grid place-content-center select-none",
            isDesktop && size === "lg" ? "h-11 w-20" : "h-10 w-16"
          )}
        >
          {quantity}
        </span>
        <Button
          className="w-10 rounded-l-none"
          onClick={() => onValueChange(1)}
          disabled={isDisableAddButton}
          size={
            ["lg", "md", "sm", "default", "icon"].includes(size) ? size : "sm"
          }
          variant="default"
        >
          <PlusIcon />
        </Button>
      </div>
    </div>
  );
};
