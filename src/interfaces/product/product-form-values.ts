import { Product } from "@/interfaces/product/product";
import { ProductImage } from "@/interfaces/product/product-image";

interface ProductFormValues extends Omit<Product, "id"> {
  id?: string;
  productImage?: ProductImage[];
}

export type { ProductFormValues };
