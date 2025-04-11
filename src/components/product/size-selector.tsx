import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { cn } from "@/lib/utils";
import { SizeSelectorProps } from "@/interfaces/size-selector-props";
import { Size } from "@/interfaces/size";

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
