import { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Separator } from "../ui/separator";
import Link from "next/link";
import { buttonVariants } from "../ui/button";

interface CartSummaryProps extends ComponentPropsWithoutRef<"div"> {}

export const CartSummary = ({ className, ...props }: CartSummaryProps) => {
  return (
    <Card {...props} className={cn("w-full h-fit p-4", className)}>
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
      <Link
        href="/checkout/address"
        className={cn(buttonVariants({ variant: "default" }), "mt-6 w-full")}
      >
        checkout
      </Link>
    </Card>
  );
};
