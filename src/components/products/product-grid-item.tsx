"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { FormatNumber } from "@/utils/format-number";
import { ProductGridItemProps } from "@/interfaces/product/product-grid-item-props";

const ProductGridItem = ({
  product,
  className,
  ...props
}: ProductGridItemProps) => {
  const { slug, title, images, price } = product;

  const [displayImage, setDisplayImage] = useState(`/products/${images[0]}`);

  const handleMouseEnter = () => {
    setDisplayImage(`/products/${images[1]}`);
  };

  const handleMouseLeave = () => {
    setDisplayImage(`/products/${images[0]}`);
  };

  return (
    <Card {...props} className={cn("", className)}>
      <Link href={`/product/${slug}`}>
        <Image
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

export { ProductGridItem };
