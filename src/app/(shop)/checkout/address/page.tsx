import { CheckoutAddressForm } from "@/components/checkout/checkout-address-form";
import { TitlePage } from "@/components/shared/title-page";

export default function AddressPage() {
  return (
    <div className="col-start-1 px-4 col-span-4 md:col-span-8 lg:col-span-12 ">
      <TitlePage title="Dirección" subTitle="Dirección de entrega" />
      <CheckoutAddressForm />
    </div>
  );
}
