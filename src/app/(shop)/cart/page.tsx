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
    <div className="grid lg:grid-cols-10 pb-40 px-4 py-6">
      <div className="flex flex-col items-start lg:col-start-1 lg:col-span-3 ">
        <TitlePage title="Carrito" />
        <div className="text-xl mt-8">Agregar más items</div>
        <Link href="/" className="underline mt-2">
          Continúa comprando
        </Link>
        <div className="flex flex-col gap-y-4 mt-6">
          {productsInCart.map((product, index) => (
            <ItemProductCart key={product.slug + index} product={product} />
          ))}
        </div>
      </div>

      {/* Checkout Summary */}
      <CartSummary className="lg:col-start-8 lg:col-span-3  sticky top-20" />
    </div>
  );
}
