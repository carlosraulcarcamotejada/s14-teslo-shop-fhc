import { ComponentPropsWithoutRef, Dispatch, SetStateAction } from "react";
import { SizeOption } from "@/interfaces/shared/size-option";

interface SizeSelectorProps extends ComponentPropsWithoutRef<"div"> {
  selectedSize: SizeOption | undefined;
  setSize: Dispatch<SetStateAction<SizeOption | undefined>>;
  availableSizes: SizeOption[];
}

export type { SizeSelectorProps };
