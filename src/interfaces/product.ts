import { Type } from "@/interfaces/type";
import { Category } from "@/interfaces/category";
import { Size } from "@/interfaces/size";

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
