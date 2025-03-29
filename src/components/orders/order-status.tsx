import { CreditCardIcon } from "lucide-react";
import { OrderStatusProps } from "@/interfaces/order-status-props";
import clsx from "clsx";

export const OrderStatus = ({
  className,
  description,
  isPaid = false,
  title,
  ...props
}: OrderStatusProps) => {
  const paymentStatus = isPaid ? "Pagado" : "Pendiente de pago";

  return (
    <div
      {...props}
      className={clsx(
        "flex items-center justify-start w-full  rounded-md p-4 text-white gap-x-4 mt-6",
        isPaid && "bg-green-500",
        !isPaid && "bg-red-500",
        className
      )}
    >
      <CreditCardIcon className="size-6" />
      <span className="font-bold">{paymentStatus}</span>
    </div>
  );
};
