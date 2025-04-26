import Image from "next/image";
import { Card } from "@/components/ui/card";
import { ItemProductCartCheckoutProps } from "@/interfaces/cart/item-product-cart-checkout-props";
import { cn } from "@/lib/utils";
import { FormatNumber } from "@/utils/format-number";
import Link from "next/link";

export const ItemProductCartCheckout = ({
  className,
  productInCart,
  ...props
}: ItemProductCartCheckoutProps) => {
  const {
    image,
    price = 0,
    quantity,
    selectedSize,
    title,
    slug,
  } = productInCart;

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
          <Link href={slug} className="font-bold hover:underline">
            {`${selectedSize} - ${title}`} ({quantity})
          </Link>
          {/* Price */}
          <div className="font-semibold">{FormatNumber(price * quantity)}</div>
        </div>
      </div>
    </Card>
  );
};
