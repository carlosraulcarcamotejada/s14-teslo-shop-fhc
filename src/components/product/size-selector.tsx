import { Size } from "@/seed/seed";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { ClassValue } from "clsx";
import { cn } from "@/lib/utils";

interface SizeSelectorProps {
  selectedSize: Size;
  availableSizes: Size[];
  className?: ClassValue;
}

export const SizeSelector = ({
  availableSizes,
  selectedSize,
  className,
}: SizeSelectorProps) => {
  return (
    <div className={cn("flex flex-col items-start gap-y-4", className)}>
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
