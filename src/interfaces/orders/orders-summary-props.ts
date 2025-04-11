import { ComponentPropsWithoutRef } from "react";
import { Address } from "@/interfaces/shared/address";
import { TotalSummary } from "@/interfaces/components/total-summary";

interface OrdersSummaryProps extends ComponentPropsWithoutRef<"div"> {
  address: Address;
  totalSumary: TotalSummary;
  totalItems: number;
  isPaid?: boolean;
  orderId: string;
  amount: number;
}

export type { OrdersSummaryProps };
