import { Size } from "@/seed/seed";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

interface SizeSelectorProps {
  selectedSize: Size;
  availableSizes: Size[];
}

export const SizeSelector = ({
  availableSizes,
  selectedSize,
}: SizeSelectorProps) => {
  return (
    <div className="flex flex-col items-start gap-y-4">
      <h3 className="font-bold">Tallas disponibles:</h3>
      <ToggleGroup defaultValue={selectedSize} className="flex flex-wrap justify-start items-center" type="single">
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
