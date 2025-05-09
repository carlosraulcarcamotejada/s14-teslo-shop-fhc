import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { FormatNumber } from "@/utils/format-number";
import { ItemProductCartOrdersProps } from "@/interfaces/cart/item-product-cart-orders-props";
import { ProductImage } from "@/components/product/product-image";
import { Link } from "@/components/ui/link";

export const ItemProductCartOrders = ({
  className,
  productInCartOrders,
  ...props
}: ItemProductCartOrdersProps) => {
  const {
    image,
    price = 0,
    quantity,
    selectedSize,
    title,
    slug,
  } = productInCartOrders;

  return (
    <Card className={cn("flex gap-x-2 overflow-hidden", className)} {...props}>
      {/* Image */}
      <ProductImage
        className="h-52 w-40 object-cover lg:w-48"
        src={image}
        alt={title}
        height={200}
        width={200}
      />
      <div className="flex flex-col gap-y-2 items-start justify-between py-2">
        <div className="flex flex-col gap-y-2">
          {/* Title */}
          <Link href={`/product/${slug}`} className="font-bold hover:underline">
            {`${selectedSize} - ${title}`} ({quantity})
          </Link>
          {/* Price */}
          <div className="font-semibold">{FormatNumber(price * quantity)}</div>
        </div>
      </div>
    </Card>
  );
};
