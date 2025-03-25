import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { StatusOrders } from "@/components/orders/status-orders";
import { OrdersSummaryProps } from "@/interfaces/orders-summary-props";
import { FormatNumber } from "@/utils/format-number";

export const OrdersSummary = ({
  address: addressData,
  className,
  isPaid = false,
  totalItems,
  totalSumary,
  ...props
}: OrdersSummaryProps) => {
  const {
    address,
    city,
    country,
    lastNames,
    mobilePhone,
    names,
    zipCode,
    address2,
  } = addressData;

  const { subTotal, tax, total } = totalSumary;

  return (
    <Card className={cn("h-fit p-4", className)} {...props}>
      <h2 className="text-2xl mb-6 text-center font-bold">
        Dirección de entrega
      </h2>

      <div>
        <p>
          {names} {lastNames}
        </p>
        <p>{address}</p>
        <p>{address2}</p>
        <p>{zipCode}</p>
        <p>
          {city} {country}
        </p>
        <p>{mobilePhone}</p>
      </div>
      <Separator orientation="horizontal" className="my-10" />

      <h2 className="text-2xl mb-6 text-center font-bold">Resumen de orden</h2>
      <div className="grid grid-cols-2 ">
        <span>No. Artículos</span>
        <span className="text-right">{`${totalItems} ${
          totalItems > 1 ? "artículos" : "artículo"
        }`}</span>

        <span>Subtotal</span>
        <span className="text-right">{FormatNumber(subTotal)}</span>

        <span>Impuestos (15%)</span>
        <span className="text-right">{FormatNumber(tax)}</span>

        <Separator orientation="horizontal" className="col-span-2 my-10" />

        <span className="text-2xl"> Total (15%)</span>
        <span className="text-right text-2xl">{FormatNumber(total)}</span>
      </div>

      <StatusOrders title="Pendiente de pago" isPaid={isPaid} />
    </Card>
  );
};
