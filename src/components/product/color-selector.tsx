import { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

interface ColorSelectorProps extends ComponentPropsWithoutRef<"div"> {}

export const ColorSelector = ({ className, ...props }: ColorSelectorProps) => {
  return (
    <div {...props} className={cn("flex flex-col gap-y-4", className)}>
      <h3 className="font-bold">Color:</h3>
    </div>
  );
};
