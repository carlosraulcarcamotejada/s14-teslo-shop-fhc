import { ProductImage } from "@/interfaces/product/product-image";
import { Size } from "@/interfaces/shared/size";

interface Product {
  category: string;
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
  type: string;
}

export type { Product };
