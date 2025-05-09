import { Product } from "@/interfaces/product/product";
import { SizeOption } from "@/interfaces/shared/size-option";

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
  selectedSize: SizeOption;
}

export type { ProductInCart };
