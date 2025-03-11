"use client";
import { useSelector } from "react-redux";
import { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";
import { ItemProductCart } from "./item-product-cart";
import { RootState } from "@/store/store";

interface ProductsInCartProps extends ComponentPropsWithoutRef<"div"> {}

export const ProductsInCart = ({
  className,
  ...props
}: ProductsInCartProps) => {
  const products = useSelector((state: RootState) => state.cart.cart);

  return (
    <div className={cn("", className)} {...props}>
      {products.map((product) => (
        <ItemProductCart
          key={product.id + product.selectedSize}
          product={product}
        />
      ))}
    </div>
  );
};
