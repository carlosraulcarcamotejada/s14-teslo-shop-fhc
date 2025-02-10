import { CartSummary } from "@/components/cart/cart-summary";
import { ItemProductCart } from "@/components/cart/item-product-cart";
import { TitlePage } from "@/components/shared/title-page";
import { initialData } from "@/seed/seed";
import Link from "next/link";

const productsInCart = [
  initialData.products[0],
  initialData.products[1],
  initialData.products[2],
];

export default function CartPage() {
  return (
    <>
      <div className="col-start-1 px-4 md:px-0 col-span-4 md:ml-4 md:col-span-4 lg:col-span-4">
        <TitlePage title="Carrito" />
        <div className="text-xl mt-8">Agregar más items</div>
        <Link href="/" className="underline underline-offset-4 mt-2">
          Continúa comprando
        </Link>
        <div className="flex flex-col gap-y-4 mt-6">
          {productsInCart.map((product, index) => (
            <ItemProductCart key={product.slug + index} product={product}  />
          ))}
        </div>
      </div>

      {/* Checkout Summary */}
      <CartSummary className="mt-10 mx-4 col-start-1 col-span-4 md:mt-0 md:right-4 md:col-span-4 md:col-start-6 lg:col-start-9 lg:col-span-4 md:sticky md:top-20" />
    </>
  );
}
