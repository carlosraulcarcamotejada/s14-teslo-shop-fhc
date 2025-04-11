import { Type } from "@/interfaces/shared/type";
import { Category } from "@/interfaces/shared/category";
import { Size } from "@/interfaces/shared/size";

interface Product {
  id: string;
  category: Category;
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
