import Image from "next/image";
import { Card } from "@/components/ui/card";
import { ItemProductCartCheckoutProps } from "@/interfaces/item-product-cart-checkout-props";
import { cn } from "@/lib/utils";
import { FormatNumber } from "@/utils/format-number";

export const ItemProductCartCheckout = ({
  className,
  product,
  ...props
}: ItemProductCartCheckoutProps) => {
  const { image, price, quantity, selectedSize, title } = product;

  return (
    <Card className={cn("flex gap-x-2 overflow-hidden", className)} {...props}>
      {/* Image */}
      <Image
        className="h-52 w-40 object-cover lg:w-48"
        src={`/products/${image}`}
        alt={title}
        height={200}
        width={200}
      />
      <div className="flex flex-col gap-y-2 items-start justify-between py-2">
        <div className="flex flex-col gap-y-2">
          {/* Title */}
          <span className="font-bold">
            {`${selectedSize} - ${title}`} ({quantity})
          </span>
          {/* Price */}
          <div className="font-semibold">{FormatNumber(price * quantity)}</div>
        </div>
      </div>
    </Card>
  );
};
