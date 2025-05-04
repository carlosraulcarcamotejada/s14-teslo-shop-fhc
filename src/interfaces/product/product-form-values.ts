import { Product } from "@/interfaces/product/product";
import { ProductImage } from "@/interfaces/product/product-image";

interface ProductFormValues extends Product {
  productImage?: ProductImage[];
  imagesFile?: File[];
}

export type { ProductFormValues };
