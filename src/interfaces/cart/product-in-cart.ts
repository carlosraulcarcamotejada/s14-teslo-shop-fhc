import { Product, Size } from "@/seed/seed";

interface ProductInCart
  extends Omit<
    Product,
    "images" | "description" | "tags" | "type" | "category"
  > {
  image: string;
  quantity: number;
  selectedSize: Size;
}

export type { ProductInCart };
