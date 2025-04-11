import { ComponentPropsWithoutRef, Dispatch, SetStateAction } from "react";
import { Size } from "@/interfaces/size";

interface SizeSelectorProps extends ComponentPropsWithoutRef<"div"> {
  selectedSize: Size | undefined;
  setSize: Dispatch<SetStateAction<Size | undefined>>;
  availableSizes: Size[];
}

export type { SizeSelectorProps };
