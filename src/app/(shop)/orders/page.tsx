import { TableOrders } from "@/components/orders/table-orders";

export default function OrdersPage() {
  return (
    <div className="grid lg:grid-cols-10 pb-40 px-4 py-6">
      <TableOrders className="col-start-1 col-span-full" />
    </div>
  );
}
