import { Product } from "@/interfaces/product/product";
import { Size } from "@/interfaces/shared/size";

interface ProductInCart
  extends Omit<
    Product,
    | "images"
    | "description"
    | "tags"
    | "type"
    | "categoryOption"
    | "categoryId"
    | "typeId"
    | "typeOption"
    | "sizes"
  > {
  image: string;
  quantity: number;
  selectedSize: Size;
}

export type { ProductInCart };
