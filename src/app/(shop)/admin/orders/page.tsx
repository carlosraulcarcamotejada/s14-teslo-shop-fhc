export const revalidate = 0;
import { getOrdersByUserPaginated } from "@/actions/order/get-orders-by-user";
import { OrdersTable } from "@/components/orders/orders-table";
import { TitlePage } from "@/components/shared/title-page";

export default async function AdminOrdersPage() {
  const { orders, totalPages } = await getOrdersByUserPaginated();

  return (
    <div className="col-start-1 col-span-full px-4">
      <TitlePage title={`Ordenes:`} size="m" />
      <OrdersTable data={orders} totalPages={totalPages} />
    </div>
  );
}
