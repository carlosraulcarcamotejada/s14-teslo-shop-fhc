import { Type } from "@/interfaces/shared/type";
import { CategoryOption } from "@/interfaces/category/category-option";
import { Size } from "@/interfaces/shared/size";

interface Product {
  id: string;
  category: CategoryOption;
  description: string;
  images: string[];
  inStock: number;
  price: number;
  sizes: Size[];
  slug: string;
  tags: string[];
  title: string;
  type: Type;
}

export type { Product };
