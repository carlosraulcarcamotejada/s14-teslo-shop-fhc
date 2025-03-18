import { Size } from "@/seed/seed";
import { ComponentPropsWithoutRef, Dispatch, SetStateAction } from "react";

interface SizeSelectorProps extends ComponentPropsWithoutRef<"div"> {
  selectedSize: Size | undefined;
  setSize: Dispatch<SetStateAction<Size | undefined>>;
  availableSizes: Size[];
}

export type { SizeSelectorProps };
