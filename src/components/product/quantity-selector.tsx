"use client";
import { Button } from "@/components/ui/button";
import { MinusIcon, PlusIcon } from "lucide-react";
import { useState } from "react";

interface QuantitySelectorProps {
  quantityDefault?: number;
}

export const QuantitySelector = ({
  quantityDefault = 1,
}: QuantitySelectorProps) => {
  const [quantity, setQuantity] = useState<number>(quantityDefault);

  const onQuantityChange = (value: number = 1) => {
    setQuantity((preVal) => preVal + value);
  };

  const isDisableAddButton: boolean = quantity >= 5;

  const isDisableSubtractButton: boolean = quantity <= 1;

  return (
    <div className="flex flex-col gap-y-4">
      <h3 className="font-bold">Cantidad:</h3>
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
