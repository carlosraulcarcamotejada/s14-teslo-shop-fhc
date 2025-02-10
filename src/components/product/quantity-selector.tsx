"use client";
import { ComponentPropsWithoutRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { MinusIcon, PlusIcon } from "lucide-react";
import { useResponsive } from "@/hooks/use-responsive";

interface QuantitySelectorProps extends ComponentPropsWithoutRef<"div"> {
  quantityDefault?: number;
  title?: string;
  limit?: number;
  size?: "md" | "lg" | "auto"; 
}

export const QuantitySelector = ({
  quantityDefault = 1,
  className,
  limit = 5,
  title,
  size = "lg",
  ...props
}: QuantitySelectorProps) => {
  const [quantity, setQuantity] = useState<number>(quantityDefault);

  const onQuantityChange = (value: number = 1) => {
    setQuantity((preVal) => preVal + value);
  };

  const isDisableAddButton: boolean = quantity >= limit;

  const isDisableSubtractButton: boolean = quantity <= 1;

  const {isDesktop} = useResponsive();

  return (
    <div {...props} className={cn("flex flex-col gap-y-4", className)}>
      {title && <h3 className="font-bold">Cantidad:</h3>}
      <div className="flex gap-x-4">
        <Button
          onClick={() => onQuantityChange(-1)}
          disabled={isDisableSubtractButton}
          size={isDesktop && size === "lg" || isDesktop && size === "auto" ? "lg": "md"}
          variant="outline"
          className="w-10"
        >
          <MinusIcon />
        </Button>
        <span
          className={cn(
            "bg-accent rounded-md grid place-content-center select-none" ,
            isDesktop && size === "lg" || isDesktop && size === "auto" ? "h-11 w-20": "h-10 w-16"
          )}
        >
          {quantity}
        </span>
        <Button
          onClick={() => onQuantityChange(1)}
          disabled={isDisableAddButton}
          size={isDesktop && size === "lg" || isDesktop && size === "auto" ? "lg": "md"}
          variant="outline"
          className="w-10"
        >
          <PlusIcon />
        </Button>
      </div>
    </div>
  );
};
