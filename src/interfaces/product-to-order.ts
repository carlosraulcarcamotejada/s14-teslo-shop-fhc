import { ProductInCart } from "@/interfaces/product-in-cart";

interface ProductToOrder
  extends Omit<
    ProductInCart,
    "image" | "title" | "inStock" | "price" | "slug"
  > {}

export type { ProductToOrder };
