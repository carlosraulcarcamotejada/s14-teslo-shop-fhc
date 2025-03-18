import { ComponentPropsWithoutRef } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { QuantitySelector } from "@/components/product/quantity-selector";
import { Button } from "@/components/ui/button";
import { Trash2Icon } from "lucide-react";
import { ProductInCart } from "@/interfaces/product-in-cart";
import { useCart } from "@/hooks/use-cart";

interface ItemProductCartProps extends ComponentPropsWithoutRef<"div"> {
  product: ProductInCart;
}

export const ItemProductCart = ({
  className,
  product,
  ...props
}: ItemProductCartProps) => {
  const { id, image, price, quantity, selectedSize, slug, title, inStock } =
    product;

  const { removeCartProduct, updateCartProductQuantity } = useCart();

  return (
    <Card className={cn("flex gap-x-2 overflow-hidden", className)} {...props}>
      {/* Image */}
      <Image
        className="h-52 w-24 object-cover"
        src={`/products/${image}`}
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
            size="auto"
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
          Remover <Trash2Icon />
        </Button>
      </div>
    </Card>
  );
};
