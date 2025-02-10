import { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";
import { Product } from "@/seed/seed";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { QuantitySelector } from "@/components/product/quantity-selector";
import { Button } from "@/components/ui/button";
import { Trash2Icon } from "lucide-react";

interface ItemProductCartProps extends ComponentPropsWithoutRef<"div"> {
  product: Product;
}

export const ItemProductCart = ({
  className,
  product,
  ...props
}: ItemProductCartProps) => {
  const { images, title, price } = product;

  return (
    <Card className={cn("flex gap-x-2 overflow-hidden", className)} {...props}>
      <Image
        className="h-52 w-24 object-cover"
        src={`/products/${images[0]}`}
        alt={title}
        height={200}
        width={200}
      />
      <div className="flex flex-col gap-y-2 items-start justify-between py-2">
        <div className="flex flex-col gap-y-2">
          <div className="font-bold">{title}</div>
          <div>${price}</div>
          <QuantitySelector size="auto" />
        </div>
        <Button variant="outline" className="flex items-center justify-center">
          Remover <Trash2Icon />
        </Button>
      </div>
    </Card>
  );
};
