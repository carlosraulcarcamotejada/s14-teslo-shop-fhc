import { ProductInCart } from "@/interfaces/product/product-in-cart";

type ProductToOrder = Omit<
  ProductInCart,
  "image" | "title" | "inStock" | "price" | "slug"
>;

export type { ProductToOrder };
