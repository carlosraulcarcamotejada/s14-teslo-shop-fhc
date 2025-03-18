"use client";
import { useSelector } from "react-redux";
import { ItemProductCart } from "@/components/cart/item-product-cart";
import { RootState } from "@/store/store";
import { ProductsInCartProps } from "@/interfaces/products-in-cart-props";
import { cn } from "@/lib/utils";

export const ProductsInCart = ({
  className,
  ...props
}: ProductsInCartProps) => {
  const products = useSelector((state: RootState) => state.cartStore.cart);

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
