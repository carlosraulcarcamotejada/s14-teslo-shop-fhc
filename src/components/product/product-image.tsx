import Image from "next/image";
import { ProductImageProps } from "@/interfaces/product/product-image-props";
import { cn } from "@/lib/utils";

export const ProductImage = ({
  src,

  className,
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
      className={cn("", isMissingSrc && "h-[305px]", className)}
      src={localSrc}
    />
  );
};
