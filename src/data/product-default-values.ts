import { Product } from "@/interfaces/product/product";
import { ProductImage } from "@/interfaces/product/product-image";

export const productDefaultValues: Product & { productImage: ProductImage[] } =
  {
    category: "non-category",
    description: "",
    id: "",
    images: [],
    inStock: 0,
    price: 0,
    productImage: [],
    sizes: [],
    slug: "",
    tags: [],
    title: "",
    type: "non-type",
  };
