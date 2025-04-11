export const revalidate = 0;

import { getOrdersByUserPaginated } from "@/actions/order/get-orders-by-user";
import { OrdersTable } from "@/components/orders/orders-table";
import { PageContainer } from "@/components/page/page-container";
import { TitlePage } from "@/components/shared/title-page";

export default async function AdminOrdersPage() {
  const { orders, totalPages } = await getOrdersByUserPaginated();

  return (
    <PageContainer>
      <TitlePage title={`Ordenes:`} size="m" />
      <OrdersTable data={orders} totalPages={totalPages} />
    </PageContainer>
  );
}
