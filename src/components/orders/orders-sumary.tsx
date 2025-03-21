import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { StatusOrders } from "@/components/orders/status-orders";
import { OrdersSummaryProps } from "@/interfaces/orders-summary-props";

export const OrdersSummary = ({ className, ...props }: OrdersSummaryProps) => {
  return (
    <Card className={cn("h-fit p-4", className)} {...props}>
      <h2 className="text-2xl mb-6 text-center font-bold">
        Dirección de entrega
      </h2>

      <div>
        <p>Fernando Herrera</p>
        <p>Av. Siempre viva</p>
        <p>Col. El centro</p>
        <p>Alcaldía municipal</p>
        <p>Tegucigala</p>
        <p>CP. 32232</p>
        <p>3230.3232.23323</p>
      </div>
      <Separator orientation="horizontal" className="my-10" />

      <h2 className="text-2xl mb-6 text-center font-bold">Resumen de orden</h2>
      <div className="grid grid-cols-2 ">
        <span>No. Artículos</span>
        <span className="text-right">3 artículos</span>

        <span>Subtotal</span>
        <span className="text-right">$ 100.00</span>

        <span>Impuestos (15%)</span>
        <span className="text-right">$ 100.00</span>

        <Separator orientation="horizontal" className="col-span-2 my-10" />

        <span className="text-2xl"> Total (15%)</span>
        <span className="text-right text-2xl">$ 100.00</span>
      </div>

      <StatusOrders title="Pendiente de pago" />
    </Card>
  );
};
