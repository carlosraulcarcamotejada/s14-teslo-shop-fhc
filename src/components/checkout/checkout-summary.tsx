import { ComponentPropsWithoutRef } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { buttonVariants } from "@/components/ui/button";

interface CheckoutSummaryProps extends ComponentPropsWithoutRef<"div"> {}

export const CheckoutSummary = ({
  className,
  ...props
}: CheckoutSummaryProps) => {
  return (
    <Card className={cn("w-full h-fit p-4", className)} {...props}>
      <h2 className="text-2xl mb-6 text-center font-bold">
        Dirección de entrega
      </h2>

      <div>
        <p>Fernando Herrera</p>
        <p>Av. Siempre viva</p>
        <p>Col. El centro</p>
        <p>Alcaldía municipal</p>
        <p>Tegucigala</p>
        <p>CP. 32232</p>
        <p>3230.3232.23323</p>
      </div>
      <Separator orientation="horizontal" className="my-10" />

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

      <p className="mt-6 text-start">
        <span className="text-xs">
          Al hacer click en "colocar orden", aceptas nuestros&nbsp;
          <Link href="#" className="underline">
            términos y condiciones de uso
          </Link>
          &nbsp;y&nbsp;
          <Link href="#" className="underline">
            políticas de privacidad
          </Link>
        </span>
      </p>

      <Link
        href="/orders/123"
        className={cn(buttonVariants({ variant: "default" }), "mt-6 w-full")}
      >
        Colocar orden
      </Link>
    </Card>
  );
};
