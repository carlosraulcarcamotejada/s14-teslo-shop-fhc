// import { Address } from "@/interfaces/shared/address";

interface GetOrderByIDPrismaResponse {
  id: string;
  subTotal: number;
  tax: number;
  total: number;
  itemsInOrder: number;
  isPaid: boolean;
  paidAt: Date | null;
  createdAt: Date | null;
  updatedAt: Date | null;
  userId: string;
  transactionId: string | null;
  OrderAddress: Address | null;
  OrderItem: OrderItem[];
}

interface Address {
  names: string;
  lastNames: string;
  address: string;
  zipCode: string;
  city: string;
  mobilePhone: string;
  countryId: string;
  address2: string;
  saveForm: boolean;

  orderId: string;
  id: string;
}

interface OrderItem {
  price: number;
  quantity: number;
  size: string;
  product: Product;
}

interface Product {
  id: string;
  slug: string;
  title: string;
  categoryId: string;
  typeId: string;
  category: Category;
  type: Category;
  productImage: ProductImage[];
}

interface Category {
  name: string;
}

interface ProductImage {
  url: string;
}

export type { GetOrderByIDPrismaResponse };
