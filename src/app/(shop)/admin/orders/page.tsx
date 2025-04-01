export const revalidate = 0;
import { getOrdersByUser } from "@/actions/order/get-orders-by-user";
import { OrdersTable } from "@/components/orders/orders-table";
import { TitlePage } from "@/components/shared/title-page";
import { Order } from "@/interfaces/order";

export default async function AdminOrdersPage() {
  const { ok, orders = [] } = await getOrdersByUser();

  const data: Order[] = orders?.map((order) => ({
    completeName: `${order.OrderAddress?.names} ${order.OrderAddress?.lastNames}`,
    id: order.id,
    isPaid: order.isPaid,
  }));

  return (
    <div className="col-start-1 col-span-full px-4">
      <TitlePage title={`Ordenes:`} size="m" />
      <OrdersTable className="" data={data} />
    </div>
  );
}
