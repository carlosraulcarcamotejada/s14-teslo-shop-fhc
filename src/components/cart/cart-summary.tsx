"use client";
import { useSelector } from "react-redux";
import Link from "next/link";
import { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Separator } from "../ui/separator";
import { buttonVariants } from "../ui/button";
import { CheckSquareIcon } from "lucide-react";
import { selectSumaryInfomation, selectTotalItems } from "@/store/selectors";
import { FormatNumber } from "@/utils/format-number";

interface CartSummaryProps extends ComponentPropsWithoutRef<"div"> {}

export const CartSummary = ({ className, ...props }: CartSummaryProps) => {
  const { subTotal, tax, total } = useSelector(selectSumaryInfomation);
  const totalItems = useSelector(selectTotalItems);

  return (
    <Card {...props} className={cn("p-4 h-fit", className)}>
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
      <Link
        href="/checkout/address"
        className={cn(buttonVariants({ variant: "default" }), "mt-6 w-full")}
      >
        Checkout
        <CheckSquareIcon />
      </Link>
    </Card>
  );
};
