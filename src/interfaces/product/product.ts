import { CategoryOption } from "@/interfaces/category/category-option";
import { Size } from "@/interfaces/shared/size";
import { TypeOption } from "@/interfaces/type/type-option";

interface Product {
  id: string;
  category: CategoryOption;
  description: string;
  images: string[];
  inStock?: number;
  price?: number;
  sizes: Size[];
  slug: string;
  tags: string[];
  title: string;
  type: TypeOption;
}

export type { Product };
