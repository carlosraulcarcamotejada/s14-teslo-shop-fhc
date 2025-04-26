import { CategoryOption } from "@/interfaces/category/category-option";
import { ProductImage } from "@/interfaces/product/product-image";
import { Size } from "@/interfaces/shared/size";
import { TypeOption } from "@/interfaces/type/type-option";

interface Product {
  category: CategoryOption;
  description: string;
  id: string;
  images: string[];
  inStock?: number;
  price?: number;
  productImage?: ProductImage[];
  sizes: Size[];
  slug: string;
  tags: string[];
  title: string;
  type: TypeOption;
}

export type { Product };
