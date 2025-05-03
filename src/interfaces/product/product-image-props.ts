import {
  PlaceholderValue,
  OnLoadingComplete,
} from "next/dist/shared/lib/get-img-props";
import { ImageLoader } from "next/image";
import { ImgHTMLAttributes } from "react";

export interface ProductImageProps
  extends Omit<
    ImgHTMLAttributes<HTMLImageElement>,
    "height" | "width" | "loading" | "ref" | "alt" | "src" | "srcSet"
  > {
  src?: string;
  alt: string;
  width?: number | `${number}`;
  height?: number | `${number}`;
  fill?: boolean;
  loader?: ImageLoader;
  quality?: number | `${number}`;
  priority?: boolean;
  loading?: "eager" | "lazy" | undefined;
  placeholder?: PlaceholderValue;
  blurDataURL?: string;
  unoptimized?: boolean;
  overrideSrc?: string;
  onLoadingComplete?: OnLoadingComplete;
  layout?: string;
  objectFit?: string;
  objectPosition?: string;
  lazyBoundary?: string;
  lazyRoot?: string;
}
