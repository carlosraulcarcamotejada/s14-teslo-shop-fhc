import { TitlePage } from "@/components/shared/title-page";
import { initialData } from "@/seed/seed";
import { ItemProductCheckout } from "@/components/checkout/item-product-checkout";
import { PageProps } from "@/interfaces/page-props";
import { OrdersSummary } from "@/components/orders/orders-sumary";
import { StatusOrders } from "@/components/orders/status-orders";

const productsInCart = [
  initialData.products[0],
  initialData.products[1],
  initialData.products[2],
];

export default async function OrderPage({ params }: PageProps) {
  const { id } = await params;
  return (
    <>
      <div className="col-start-1 px-4 md:px-0 col-span-4 md:ml-4 md:col-span-4 lg:col-span-4">
        <TitlePage title={`Orden #${id}`} />
        <StatusOrders title="Pendiente de pago" />
        <div className="flex flex-col gap-y-4 mt-6">
          {productsInCart.map((product, index) => (
            <ItemProductCheckout key={product.slug + index} product={product} />
          ))}
        </div>
      </div>

      {/* Checkout Summary */}
      <OrdersSummary className="mt-10 mx-4 col-start-1 col-span-4 md:mt-0 md:right-4 md:col-span-4 md:col-start-6 lg:col-start-9 lg:col-span-4 md:sticky md:top-20" />
    </>
  );
}
