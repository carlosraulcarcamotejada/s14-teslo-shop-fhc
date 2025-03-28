import { PayPalButtonsComponentProps } from "@paypal/react-paypal-js";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export const PayPalButtonsSkeleton = ({
  className,
}: PayPalButtonsComponentProps) => {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center space-y-4 w-full pb-8",
        className
      )}
    >
      <Skeleton className="h-11 w-full" />
      <Skeleton className="h-11 w-full" />
    </div>
  );
};
