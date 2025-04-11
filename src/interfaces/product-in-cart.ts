import { Size } from "@/seed/seed";
import { Product } from "@/interfaces/product";

interface ProductInCart
  extends Omit<
    Product,
    "images" | "description" | "tags" | "type" | "category" | "sizes"
  > {
  image: string;
  quantity: number;
  selectedSize: Size;
}

export type { ProductInCart };
