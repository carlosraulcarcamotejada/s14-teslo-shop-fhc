import { Title } from "@/components/shared/title";
import { initialData } from "@/seed/seed";
import { ItemProductCheckout } from "@/components/checkout/item-product-checkout";
import { PageProps } from "@/interfaces/page/page-props";
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
    <div className="grid lg:grid-cols-10 pb-40 py-6">
      <div className="flex flex-col items-start lg:col-start-2 lg:col-span-3 ">
        <Title title={`Orden #${id}`} />
        <StatusOrders title="Pendiente de pago" />
        <div className="flex flex-col gap-y-4 mt-6">
          {productsInCart.map((product, index) => (
            <ItemProductCheckout key={product.slug + index} product={product} />
          ))}
        </div>
      </div>

      {/* Checkout Summary */}
      <OrdersSummary className="lg:col-start-7 lg:col-span-3  sticky top-20" />
    </div>
  );
}
