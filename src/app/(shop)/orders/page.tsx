export const revalidate = 0;
import { getOrdersByUser } from "@/actions/order/get-orders-by-user";
import { OrdersTable } from "@/components/orders/orders-table";
import { auth } from "@/config/auth.config";
import { Order } from "@/interfaces/order";
import { redirect } from "next/navigation";

export default async function OrdersPage() {
  const { ok, orders = [] } = await getOrdersByUser();

  if (!ok) {
    redirect("/auth/login");
  }

  const session = await auth();

  if (session?.user.role !== "user") {
    redirect("/");
  }

  const data: Order[] = orders?.map((order) => ({
    completeName: `${order.OrderAddress?.names} ${order.OrderAddress?.lastNames}`,
    id: order.id,
    isPaid: order.isPaid,
  }));

  return <OrdersTable className="col-start-1 col-span-full px-4" data={data} />;
}
