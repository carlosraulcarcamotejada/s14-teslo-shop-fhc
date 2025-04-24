import { Product } from "@/interfaces/product/product";
import { ProductImage } from "@/interfaces/product/product-image";

type ProductFormValues = Omit<Product, "id"> & {
  id?: string;
  productImage?: ProductImage[];
};

export type { ProductFormValues };
