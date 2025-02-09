"use client";
import { ComponentPropsWithoutRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Product } from "@/seed/seed";
import { cn } from "@/lib/utils";

interface ProductGridItemProps extends ComponentPropsWithoutRef<"div"> {
  product: Product;
}

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
        <div className="font-bold">{`$${price.toFixed(2)}`}</div>
      </div>
    </Card>
  );
};

export { ProductGridItem };
