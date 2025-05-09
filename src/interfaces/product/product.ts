import { SizeOption } from "@/interfaces/shared/size-option";
import { CategoryOption } from "@/interfaces/category/category-option";
import { TypeOption } from "@/interfaces/type/type-option";

interface Product {
  categoryId: string | CategoryOption;
  categoryOption?: CategoryOption;
  description: string;
  id?: string;
  images: string[];
  inStock?: number;
  price?: number;
  sizes: SizeOption[];
  slug: string;
  tags: string[];
  title: string;
  typeId: string | TypeOption;
  typeOption?: TypeOption;
}

export type { Product };
