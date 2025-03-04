import { Product, Size } from "@/seed/seed";

interface ProductInCart extends Product {
  image: string;
  quantity: number;
  selectedSize: Size;
}

export type { ProductInCart };
