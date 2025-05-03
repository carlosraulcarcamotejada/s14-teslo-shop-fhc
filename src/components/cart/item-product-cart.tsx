import Link from "next/link";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { QuantitySelector } from "@/components/product/quantity-selector";
import { Button } from "@/components/ui/button";
import { Trash2Icon } from "lucide-react";
import { useCart } from "@/hooks/use-cart";
import { ItemProductCartProps } from "@/interfaces/cart/item-product-cart-props";
import { ProductImage } from "@/components/product/product-image";

export const ItemProductCart = ({
  className,
  product,
  ...props
}: ItemProductCartProps) => {
  const {
    id = "",
    image,
    inStock,
    price,
    quantity,
    selectedSize,
    slug,
    title,
  } = product;

  const { removeCartProduct, updateCartProductQuantity } = useCart();

  return (
    <Card className={cn("flex gap-x-2 overflow-hidden", className)} {...props}>
      {/* Image */}
      <ProductImage
        className="h-52 w-40 object-cover"
        src={image}
        alt={title}
        height={200}
        width={200}
      />
      <div className="flex flex-col gap-y-2 items-start justify-between py-2">
        <div className="flex flex-col gap-y-2">
          {/* Title */}
          <Link href={`/product/${slug}`} className="font-bold hover:underline">
            {`${selectedSize} - ${title}`}
          </Link>
          {/* Price */}
          <div className="font-semibold">${price}</div>
          {/* Quantity Selector  */}
          <QuantitySelector
            size="md"
            quantity={quantity}
            quantityLimit={inStock}
            setQuantity={(newQuantity) => {
              updateCartProductQuantity(
                id,
                selectedSize,
                typeof newQuantity === "function"
                  ? newQuantity(quantity)
                  : newQuantity
              );
            }}
          />
        </div>
        <Button
          onClick={() => {
            removeCartProduct(product);
          }}
          variant="default"
          className="flex items-center justify-center select-none"
        >
          <Trash2Icon />
          Remover
        </Button>
      </div>
    </Card>
  );
};
