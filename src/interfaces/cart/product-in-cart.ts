import { Product, Size } from "@/seed/seed";

interface ProductInCart
  extends Omit<
    Product,
    "images" | "description" | "slug" | "tags" | "type" | "category"
  > {
  image: string;
  quantity: number;
  selectedSize: Size;
}

export type { ProductInCart };
