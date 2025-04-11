import { ProductsInCartOrdersProps } from "@/interfaces/products/products-in-cart-orders-props";
import { cn } from "@/lib/utils";
import { ItemProductCartOrders } from "./item-product-cart-orders";

export const ProductsInCartOrders = ({
  className,
  productsInCartOrders,
  ...props
}: ProductsInCartOrdersProps) => {
  return (
    <div className={cn("flex flex-col gap-y-4", className)} {...props}>
      {productsInCartOrders.map((productInCartOrders) => {
        return (
          <ItemProductCartOrders
            key={productInCartOrders.id + productInCartOrders.selectedSize}
            productInCartOrders={productInCartOrders}
          />
        );
      })}
    </div>
  );
};
