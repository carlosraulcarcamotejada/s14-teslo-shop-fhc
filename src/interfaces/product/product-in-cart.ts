import { Product } from "@/interfaces/product/product";
import { Size } from "@/interfaces/size";

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
