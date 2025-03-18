import { cn } from "@/lib/utils";
import { ColorSelectorProps } from "@/interfaces/color-selector-props";

export const ColorSelector = ({ className, ...props }: ColorSelectorProps) => {
  return (
    <div {...props} className={cn("flex flex-col gap-y-4", className)}>
      <h3 className="font-bold">Color:</h3>
    </div>
  );
};
