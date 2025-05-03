import Image from "next/image";
import { ProductImageProps } from "@/interfaces/product/product-image-props";
import { cn } from "@/lib/utils";

export const ProductImage = ({
  alt,
  className,
  src,
  ...rest
}: ProductImageProps) => {
  const localSrc: string = src
    ? src.startsWith("http")
      ? src
      : `/products/${src}`
    : `/imgs/placeholder.jpg`;

  const isMissingSrc: boolean = !src ? true : false;

  return (
    <Image
      {...rest}
      alt={alt}
      className={cn("", isMissingSrc && "", className)}
      src={localSrc}
    />
  );
};
