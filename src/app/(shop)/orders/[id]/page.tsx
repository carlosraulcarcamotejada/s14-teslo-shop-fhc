import { TitlePage } from "@/components/shared/title-page";
import { PageProps } from "@/interfaces/page-props";
import { OrdersSummary } from "@/components/orders/orders-sumary";
import { StatusOrders } from "@/components/orders/status-orders";
import { ProductInCart } from "@/interfaces/product-in-cart";
import { getOrderById } from "@/actions/order/get-order-by-id";
import { redirect } from "next/navigation";
import { ProductsInCartOrders } from "@/components/orders/products-in-cart-orders";
import { TotalSummary } from "@/interfaces/total-summary";

export default async function OrderPage({ params }: PageProps) {
  const { id } = await params;

  const { ok, order } = await getOrderById(id);

  if (!ok || !order) {
    redirect("/");
  }

  const { OrderAddress: address, OrderItem } = order;

  const productsInCartOrders: ProductInCart[] = OrderItem.map((orderItem) => ({
    id: orderItem.product.id,
    inStock: 0,
    price: orderItem.price,
    slug: orderItem.product.slug,
    title: orderItem.product.title,
    image: orderItem.product.productImage[0].url,
    quantity: orderItem.quantity,
    selectedSize: orderItem.size,
  }));

  const totalSumary: TotalSummary = { ...order };

  const totalItems: number = order.OrderItem.length;

  const isPaid: boolean = order.isPaid;

  return (
    <>
      <div className="col-start-1 px-4 md:px-0 col-span-4 md:ml-4 md:col-span-4 lg:col-span-4">
        <TitlePage title={`Orden: ${id.split("-").at(-1)}`} size="m" />
        <StatusOrders title="Pendiente de pago" isPaid={isPaid} />

        <ProductsInCartOrders
          className="mt-8"
          productsInCartOrders={productsInCartOrders}
        />
      </div>

      {/* Checkout Summary */}
      {address && (
        <OrdersSummary
          address={{ country: address.countryId, ...address }}
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
