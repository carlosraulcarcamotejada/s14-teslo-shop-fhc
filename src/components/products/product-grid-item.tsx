"use client";
import { useState } from "react";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Product } from "@/seed/seed";
import Link from "next/link";

const ProductGridItem = (product: Product) => {
  const { slug, title, images, price } = product;

  const [displayImage, setDisplayImage] = useState(`/products/${images[0]}`);

  const handleMouseEnter = () => {
    setDisplayImage(`/products/${images[1]}`);
  };

  const handleMouseLeave = () => {
    setDisplayImage(`/products/${images[0]}`);
  };

  return (
    <Card>
      <Link href={`/product/${slug}`}>
        <Image
          src={displayImage}
          alt={`image product ${title}`}
          className="w-full object-cover rounded-md"
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
