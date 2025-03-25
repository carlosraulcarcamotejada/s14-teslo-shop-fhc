import { ComponentPropsWithoutRef } from "react";
import { Address } from "@/interfaces/address";
import { TotalSummary } from "@/interfaces/total-summary";

interface OrdersSummaryProps extends ComponentPropsWithoutRef<"div"> {
  address: Address;
  totalSumary: TotalSummary;
  totalItems: number;
  isPaid?: boolean;
}

export type { OrdersSummaryProps };
