import { ComponentPropsWithoutRef } from "react";
import Image from "next/image";
import { Product } from "@/seed/seed";
import { Card } from "../ui/card";
import { cn } from "@/lib/utils";

interface ItemProductCheckoutProps extends ComponentPropsWithoutRef<"div"> {
  product: Product;
}

export const ItemProductCheckout = ({
  product,
  className,
  ...props
}: ItemProductCheckoutProps) => {
  const { images, title, price } = product;
  return (
    <Card className={cn("flex gap-x-2 overflow-hidden", className)} {...props}>
      <Image
        className="h-52 w-48 object-cover"
        src={`/products/${images[0]}`}
        alt={title}
        height={200}
        width={200}
      />
      <div className="flex flex-col gap-y-2 items-start justify-between py-2 pr-2">
        <div className="flex flex-col gap-y-2">
          <div className="font-bold text-wrap">{title}</div>
          <div className="flex">
            ${price} <div>&nbsp;x 3</div>
          </div>
          <div className="font-bold">Subtotal: $600</div>
        </div>
      </div>
    </Card>
  );
};
