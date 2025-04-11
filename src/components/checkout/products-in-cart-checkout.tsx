"use client";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { ProductsInCartProps } from "@/interfaces/products/products-in-cart-props";
import { cn } from "@/lib/utils";
import { ItemProductCartCheckout } from "./item-product-cart-checkout";

export const ProductsInCartCheckout = ({
  className,
  ...props
}: ProductsInCartProps) => {
  const productsInCart = useSelector(
    (state: RootState) => state.cartStore.cart
  );

  return (
    <div className={cn("flex flex-col gap-y-4", className)} {...props}>
      {productsInCart.map((productInCart) => (
        <ItemProductCartCheckout
          key={productInCart.id + productInCart.selectedSize}
          productInCart={productInCart}
        />
      ))}
    </div>
  );
};
