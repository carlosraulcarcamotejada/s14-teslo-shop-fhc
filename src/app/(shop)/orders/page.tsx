import { OrdersTable } from "@/components/orders/orders-table";

export default function OrdersPage() {
  return (
    <div className="grid lg:grid-cols-10 pb-40 px-4 py-6">
      <OrdersTable className="col-start-1 col-span-full" />
    </div>
  );
}
