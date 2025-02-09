import { Size } from "@/seed/seed";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { cn } from "@/lib/utils";
import { ComponentPropsWithoutRef } from "react";

interface SizeSelectorProps extends ComponentPropsWithoutRef<"div"> {
  selectedSize: Size;
  availableSizes: Size[];
}

export const SizeSelector = ({
  availableSizes,
  selectedSize,
  className,
  ...props
}: SizeSelectorProps) => {
  return (
    <div
      {...props}
      className={cn("flex flex-col items-start gap-y-4", className)}
    >
      <h3 className="font-bold">Tallas disponibles:</h3>
      <ToggleGroup
        defaultValue={selectedSize}
        className="flex flex-wrap justify-start items-center"
        type="single"
      >
        {availableSizes.map((availableSize) => (
          <ToggleGroupItem
            variant="outline"
            size="lg"
            key={availableSize}
            value={availableSize}
          >
            {availableSize}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </div>
  );
};
