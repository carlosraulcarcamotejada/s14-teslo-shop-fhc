import { CheckoutSummary } from "@/components/checkout/checkout-summary";
import { TitlePage } from "@/components/shared/title-page";
import { ProductsInCartCheckout } from "@/components/checkout/products-in-cart-checkout";
import { Link } from "@/components/ui/link";

export default function CheckoutPage() {
  return (
    <>
      <div className="col-start-1 px-4 md:px-0 col-span-4 md:ml-4 md:col-span-4">
        <TitlePage title="Verificar orden" />
        <div className="text-xl mt-8">Ajustar elementos</div>
        <Link href="/cart" className="mt-2">
          Editar carrito
        </Link>

        {/* Products in cart checkout screen */}
        <ProductsInCartCheckout className="mt-8" />
      </div>

      {/* Checkout Summary */}
      <CheckoutSummary className="mt-10 mx-4 col-start-1 col-span-4 md:mt-0 md:right-4 md:col-span-4 md:col-start-6 lg:col-start-9 lg:col-span-4 md:sticky md:top-20" />
    </>
  );
}
