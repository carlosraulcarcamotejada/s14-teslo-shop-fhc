"use client";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { ProductsInCartProps } from "@/interfaces/products-in-cart-props";
import { cn } from "@/lib/utils";
import { ItemProductCartCheckout } from "./item-product-cart-checkout";

export const ProductsInCartCheckout = ({
  className,
  ...props
}: ProductsInCartProps) => {
  const products = useSelector((state: RootState) => state.cartStore.cart);

  return (
    <div className={cn("flex flex-col gap-y-4", className)} {...props}>
      {products.map((product) => (
        <ItemProductCartCheckout
          key={product.id + product.selectedSize}
          product={product}
        />
      ))}
    </div>
  );
};
