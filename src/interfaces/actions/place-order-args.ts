import { ProductToOrder } from "@/interfaces/product/product-to-order";
import { Address } from "@/interfaces/shared/address";

interface PlaceOrderArgs {
  productsToOrder: ProductToOrder[];
  address: Address;
}

export type { PlaceOrderArgs };
