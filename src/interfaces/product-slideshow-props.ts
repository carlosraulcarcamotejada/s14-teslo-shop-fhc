import { ComponentPropsWithoutRef } from "react";
import { EmblaOptionsType } from "embla-carousel";

interface ProductSlideshowProps extends ComponentPropsWithoutRef<"div"> {
  autoPlay?: { delay: number };
  images?: string[];
  opts?: Partial<EmblaOptionsType>;
  showArrows?: boolean;
  title?: string;
}

export type { ProductSlideshowProps };
