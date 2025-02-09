"use client";
import { ComponentPropsWithoutRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { MinusIcon, PlusIcon } from "lucide-react";

interface QuantitySelectorProps extends ComponentPropsWithoutRef<"div"> {
  quantityDefault?: number;
  title?: string;
  limit?: number;
}

export const QuantitySelector = ({
  quantityDefault = 1,
  className,
  limit = 5,
  title,
  ...props
}: QuantitySelectorProps) => {
  const [quantity, setQuantity] = useState<number>(quantityDefault);

  const onQuantityChange = (value: number = 1) => {
    setQuantity((preVal) => preVal + value);
  };

  const isDisableAddButton: boolean = quantity >= limit;

  const isDisableSubtractButton: boolean = quantity <= 1;

  return (
    <div {...props} className={cn("flex flex-col gap-y-4", className)}>
      {title && <h3 className="font-bold">Cantidad:</h3>}
      <div className="flex gap-x-4">
        <Button
          onClick={() => onQuantityChange(-1)}
          disabled={isDisableSubtractButton}
          size="lg"
          variant="outline"
          className="w-10"
        >
          <MinusIcon />
        </Button>
        <span className="h-11 w-20 bg-accent rounded-md grid place-content-center select-none">
          {quantity}
        </span>
        <Button
          onClick={() => onQuantityChange(1)}
          disabled={isDisableAddButton}
          size="lg"
          variant="outline"
          className="w-10"
        >
          <PlusIcon />
        </Button>
      </div>
    </div>
  );
};
