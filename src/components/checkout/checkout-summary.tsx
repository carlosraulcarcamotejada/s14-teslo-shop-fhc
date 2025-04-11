"use client";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { Button, buttonVariants } from "@/components/ui/button";
import { CheckoutSummaryProps } from "@/interfaces/checkout/checkout-summary-props";
import { useAddress } from "@/hooks/use-address";
import { useSelector } from "react-redux";
import { selectSumaryInfomation, selectTotalItems } from "@/store/selectors";
import { FormatNumber } from "@/utils/format-number";
import { useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { useCart } from "@/hooks/use-cart";
import { ProductToOrder } from "@/interfaces/product/product-to-order";
import { placeOrder } from "@/actions/order/place-order";
import { sleep } from "@/utils/sleep";
import { useRouter } from "next/navigation";

export const CheckoutSummary = ({
  className,
  ...props
}: CheckoutSummaryProps) => {
  const { address: addressStore } = useAddress();

  const { cart, clearCart } = useCart();

  const router = useRouter();

  const {
    address,
    address2,
    city,
    country,
    lastNames,
    mobilePhone,
    names,
    zipCode,
  } = addressStore;

  const { subTotal, tax, total } = useSelector(selectSumaryInfomation);

  const totalItems = useSelector(selectTotalItems);

  const [isPlacingOrder, setIsPlacingOrder] = useState<boolean>(false);

  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  );

  const onPlaceOrder = async () => {
    setIsPlacingOrder(true);
    await sleep(0.05);
    const productsToOrder: ProductToOrder[] =
      cart.map(({ id, quantity, selectedSize }) => ({
        id,
        quantity,
        selectedSize,
      })) ?? [];

    const resp = await placeOrder({ address: addressStore, productsToOrder });

    if (!resp?.ok) {
      setErrorMessage(resp?.message);
      setIsPlacingOrder(false);
      return;
    }

    // todo salió bien
    clearCart();
    router.replace("/orders/" + resp?.order?.id);
  };

  return (
    <Card className={cn("h-fit p-4", className)} {...props}>
      <h2 className="text-2xl mb-6 text-center font-bold">
        Dirección de entrega:
      </h2>

      <div>
        <p>
          {names} {lastNames}
        </p>
        <p>{address}</p>
        <p>{address2}</p>
        <p>{zipCode}</p>
        <p>
          {city} {country}
        </p>
        <p>{mobilePhone}</p>
      </div>
      <Separator orientation="horizontal" className="my-10" />

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

      <p className="mt-6 text-start">
        <span className="text-xs">
          Al hacer click en &quot;colocar orden&quot;, aceptas nuestros&nbsp;
          <Link href="#" className="underline">
            términos y condiciones de uso
          </Link>
          &nbsp;y&nbsp;
          <Link href="#" className="underline">
            políticas de privacidad
          </Link>
        </span>
      </p>

      {errorMessage && (
        <Alert variant="destructive" className="mt-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error:</AlertTitle>
          <AlertDescription>{errorMessage}</AlertDescription>
        </Alert>
      )}

      <Button
        // href="/orders/123"
        onClick={onPlaceOrder}
        disabled={isPlacingOrder}
        className={cn(buttonVariants({ variant: "default" }), "mt-6 w-full")}
      >
        Colocar orden
      </Button>
    </Card>
  );
};
