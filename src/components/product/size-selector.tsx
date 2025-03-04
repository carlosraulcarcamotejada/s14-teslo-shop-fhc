import { ComponentPropsWithoutRef, Dispatch, SetStateAction } from "react";
import { Size } from "@/seed/seed";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { cn } from "@/lib/utils";

interface SizeSelectorProps extends ComponentPropsWithoutRef<"div"> {
  selectedSize: Size | undefined;
  setSize: Dispatch<SetStateAction<Size | undefined>>;
  availableSizes: Size[];
}

export const SizeSelector = ({
  availableSizes,
  className,
  setSize,
  selectedSize,
  ...props
}: SizeSelectorProps) => {
  return (
    <div
      {...props}
      className={cn("flex flex-col items-start gap-y-4", className)}
    >
      <h3 className="font-bold">Tallas disponibles:</h3>
      <ToggleGroup
        onValueChange={(size: Size) => setSize(size)}
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
