import { redirect } from "next/navigation";
import { TitlePage } from "@/components/shared/title-page";
import { PageProps } from "@/interfaces/page/page-props";
import { OrdersSummary } from "@/components/orders/orders-sumary";
import { OrderStatus } from "@/components/orders/order-status";
import { ProductInCart } from "@/interfaces/product/product-in-cart";
import { getOrderById } from "@/actions/order/get-order-by-id";
import { ProductsInCartOrders } from "@/components/orders/products-in-cart-orders";
import { TotalSummary } from "@/interfaces/components/total-summary";
import { TypeOption } from "@/interfaces/type/type-option";
import { CategoryOption } from "@/interfaces/category/category-option";
import { SizeOption } from "@/interfaces/shared/size-option";

export default async function OrderPage({ params }: PageProps) {
  const { id } = await params;
  const { success, order } = await getOrderById({ orderId: id });
  // console.log("getOrderById: ", success, message, order);

  if (!success || !order) {
    redirect("/");
  }

  const { OrderAddress, OrderItem: OrderItems } = order;

  const productsInCartOrders: ProductInCart[] = OrderItems.map((orderItem) => ({
    selectedSize: orderItem.size as SizeOption,

    id: orderItem.product.id,
    inStock: 0,
    price: orderItem.price,
    quantity: orderItem.quantity,

    slug: orderItem.product.slug,
    title: orderItem.product.title,
    image: orderItem.product.productImage[0].url,
    categoryId: orderItem.product.categoryId,
    typeId: orderItem.product.typeId,
    typeOption: orderItem.product.type.name as TypeOption,
    categoryOption: orderItem.product.category.name as CategoryOption,
  }));

  const totalSumary: TotalSummary = { ...order };

  const totalItems: number = order.itemsInOrder;

  const isPaid: boolean = order.isPaid;

  return (
    <>
      <div className="col-start-1 px-4 md:px-0 col-span-4 md:ml-4 md:col-span-4 lg:col-span-4">
        <TitlePage title={`Orden: ${id.split("-").at(-1)}`} size="m" />
        <OrderStatus title="Pendiente de pago" isPaid={isPaid} />

        <ProductsInCartOrders
          className="mt-8"
          productsInCartOrders={productsInCartOrders}
        />
      </div>

      {/* Checkout Summary */}
      {OrderAddress && (
        <OrdersSummary
          address={{ country: OrderAddress.countryId, ...OrderAddress }}
          className="mt-10 mx-4 col-start-1 col-span-4 md:mt-0 md:right-4 md:col-span-4 md:col-start-6 lg:col-start-9 lg:col-span-4 md:sticky md:top-20"
          isPaid={isPaid}
          orderId={order.id}
          totalItems={totalItems}
          totalSumary={totalSumary}
          amount={order.total}
        />
      )}
    </>
  );
}
