import { CreditCardIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { StatusOrdersProps } from "@/interfaces/status-orders-props";

export const StatusOrders = ({
  className,
  description,
  title,
  ...props
}: StatusOrdersProps) => {
  return (
    <div
      {...props}
      className={cn(
        "flex items-center justify-start w-full bg-red-500 rounded-md p-4 text-white gap-x-4 mt-6",
        className
      )}
    >
      <CreditCardIcon className="size-6" />
      <span className="font-bold">Pendiente de pago</span>
    </div>
  );
};
