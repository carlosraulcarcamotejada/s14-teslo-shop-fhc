import { Size } from "@/interfaces/shared/size";
import { CategoryOption } from "@/interfaces/category/category-option";
import { TypeOption } from "@/interfaces/type/type-option";

interface Product {
  categoryId: string;
  categoryOption: CategoryOption;
  description: string;
  id: string;
  images: string[];
  inStock?: number;
  price?: number;
  sizes: Size[];
  slug: string;
  tags: string[];
  title: string;
  typeId: string;
  typeOption: TypeOption;
}

export type { Product };
