import clsx, { ClassValue } from "clsx";
import { CreditCardIcon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { cn } from "@/lib/utils";
import { ComponentPropsWithoutRef } from "react";

interface StatusOrdersProps extends ComponentPropsWithoutRef<"div"> {
  description?: string;
  title: "Pendiente de pago" | "Pagado";
}

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
