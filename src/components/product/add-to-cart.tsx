"use client";
import { useState } from "react";
import { QuantitySelector } from "@/components/product/quantity-selector";
import { SizeSelector } from "@/components/product/size-selector";
import { Button } from "@/components/ui/button";
import { Product, Size } from "@/seed/seed";
import { AlertCircle, ShoppingCartIcon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { useCart } from "@/hooks/use-cart";
import { ProductInCart } from "@/interfaces/cart/product-in-cart";

interface AddToCartProps {
  product: Product;
}

export const AddToCart = ({ product }: AddToCartProps) => {
  const { addProductToCart } = useCart();

  const { sizes } = product;

  const [selectedSize, setSelectedSize] = useState<Size | undefined>(undefined);
  const [quantity, setQuantity] = useState<number>(1);
  const [posted, setPosted] = useState<boolean>(false);

  const onAddToCart = () => {
    setPosted(true);

    if (!selectedSize) {
      return;
    }

    const { description, images, tags, type, category, ...restProduct } =
      product;

    const productInCart: ProductInCart = {
      ...restProduct,
      quantity,
      selectedSize: selectedSize ?? "S",
      image: product.images[0],
    };

    addProductToCart(productInCart);
    setPosted(false);
    setQuantity(1);
    setSelectedSize(undefined);
  };

  return (
    <>
      {posted && !selectedSize && (
        <Alert className="mt-5 fade-in-10 fade-out-10" variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error:</AlertTitle>
          <AlertDescription>Debe seleccionar una talla.</AlertDescription>
        </Alert>
      )}

      {/* Size Selector */}
      <SizeSelector
        availableSizes={sizes}
        className="mt-4"
        selectedSize={selectedSize}
        setSize={setSelectedSize}
      />

      {/* Quantity */}
      <QuantitySelector
        className="mt-4"
        quantity={quantity}
        setQuantity={setQuantity}
        title="Cantidad"
      />

      {/* Add To Cart Button */}
      <Button
        onClick={onAddToCart}
        variant="default"
        size="lg"
        className="select-none mt-8"
      >
        Agregar al carrrito
        <ShoppingCartIcon />
      </Button>
    </>
  );
};
