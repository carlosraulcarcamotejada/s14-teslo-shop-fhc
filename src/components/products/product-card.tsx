"use client";
import { useState } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { FormatNumber } from "@/utils/format-number";
import { ProductCardProps } from "@/interfaces/product/product-card-props";
import { ProductImage } from "@/components/product/product-image";

export const ProductCard = ({
  product,
  className,
  ...props
}: ProductCardProps) => {
  const { slug, title, images, price = 0 } = product;

  const [displayImage, setDisplayImage] = useState<string | undefined>(
    images[0] ? images[0] : undefined
  );

  const handleMouseEnter = () => {
    if (images[0]) setDisplayImage(`${images[1]}`);
  };

  const handleMouseLeave = () => {
    if (images[0]) setDisplayImage(`${images[0]}`);
  };

  return (
    <Card {...props} className={cn("", className)}>
      <Link href={`/product/${slug}`}>
        <ProductImage
          src={displayImage}
          alt={`image product ${title}`}
          className="w-full object-cover rounded-t-md"
          height={500}
          width={500}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        />
      </Link>
      <div className="flex flex-col gap-y-2 m-4">
        <Link
          href={`/product/${slug}`}
          className="hover:text-sky-500 transition"
        >
          {title}
        </Link>
        <div className="font-bold">{FormatNumber(price)}</div>
      </div>
    </Card>
  );
};
