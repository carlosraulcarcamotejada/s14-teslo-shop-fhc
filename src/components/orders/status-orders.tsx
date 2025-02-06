import clsx, { ClassValue } from "clsx";
import { CreditCardIcon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { cn } from "@/lib/utils";

interface StatusOrdersProps {
  className?: ClassValue;
  description?: string;
  title: "Pendiente de pago" | "Pagado";
}

export const StatusOrders = ({
  className,
  description,
  title,
}: StatusOrdersProps) => {
  return (
    <div
      className={clsx(
        "flex items-center justify-start w-full bg-red-500 rounded-md p-4 text-white gap-x-4 mt-6"
      )}
    >
      <CreditCardIcon className="size-6" />
      <span className="font-bold">Pendiente de pago</span>
    </div>
  );
};
