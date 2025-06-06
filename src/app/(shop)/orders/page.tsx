export const revalidate = 0;
import { getOrdersByUserPaginated } from "@/actions/order/get-orders-by-user";
import { OrdersTable } from "@/components/orders/orders-table";
import { auth } from "@/config/auth.config";
import { Order } from "@/interfaces/order/order";
import { redirect } from "next/navigation";

export default async function OrdersPage() {
  const { success, orders = [] } = await getOrdersByUserPaginated();

  if (!success) {
    redirect("/auth/login");
  }

  const session = await auth();

  if (session?.user.role !== "user") {
    redirect("/");
  }

  const data: Order[] = orders?.map((order) => ({
    completeName: order.completeName,
    id: order.id,
    isPaid: order.isPaid,
    userId: order.userId,
  }));

  return <OrdersTable className="col-start-1 col-span-full px-4" data={data} />;
}
