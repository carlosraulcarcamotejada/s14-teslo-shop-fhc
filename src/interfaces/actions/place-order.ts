import { ProductToOrder } from "@/interfaces/product/product-to-order";
import { Address } from "@/interfaces/shared/address";

interface PlaceOrder {
  productsToOrder: ProductToOrder[];
  address: Address;
}

export type { PlaceOrder };
