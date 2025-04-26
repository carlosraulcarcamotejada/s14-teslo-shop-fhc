import Image from "next/image";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ItemProductCheckoutProps } from "@/interfaces/components/item-product-checkout-props";
import { FormatNumber } from "@/utils/format-number";

export const ItemProductCheckout = ({
  product,
  className,
  ...props
}: ItemProductCheckoutProps) => {
  const { image, title, price = 0, quantity } = product;
  return (
    <Card className={cn("flex gap-x-2 overflow-hidden", className)} {...props}>
      <Image
        className="h-52 w-48 object-cover"
        src={`/products/${image}`}
        alt={title}
        height={200}
        width={200}
      />
      <div className="flex flex-col gap-y-2 items-start justify-between py-2 pr-2">
        <div className="flex flex-col gap-y-2">
          <div className="font-bold text-wrap">{title}</div>
          <div className="font-bold">{FormatNumber(price * quantity)}</div>
        </div>
      </div>
    </Card>
  );
};
