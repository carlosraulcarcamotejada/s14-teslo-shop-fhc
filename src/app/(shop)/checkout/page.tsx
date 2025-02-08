import Link from "next/link";
import { CheckoutSummary } from "@/components/checkout/checkout-summary";
import { TitlePage } from "@/components/shared/title-page";
import { initialData } from "@/seed/seed";
import { ItemProductCheckout } from "@/components/checkout/item-product-checkout";

const productsInCart = [
  initialData.products[0],
  initialData.products[1],
  initialData.products[2],
];

export default function CheckoutPage() {
  return (
    <div className="grid lg:grid-cols-10 pb-40 px-4 py-6">
      <div className="flex flex-col items-start lg:col-start-1 lg:col-span-3 ">
        <TitlePage title="Verificar orden" />
        <div className="text-xl mt-8">Ajustar elementos</div>
        <Link href="/cart" className="underline mt-2">
          Editar carrito
        </Link>
        <div className="flex flex-col gap-y-4 mt-6">
          {productsInCart.map((product, index) => (
            <ItemProductCheckout key={product.slug + index} product={product} />
          ))}
        </div>
      </div>

      {/* Checkout Summary */}
      <CheckoutSummary className="lg:col-start-8 lg:col-span-3  sticky top-20" />
    </div>
  );
}
