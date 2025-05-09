import { getUserAddress } from "@/actions/address/get-user-address";
import { getCountries } from "@/actions/checkout/get-countries";
import { CheckoutAddressForm } from "@/components/checkout/checkout-address-form";
import { TitlePage } from "@/components/shared/title-page";
import { auth } from "@/config/auth.config";

export default async function AddressPage() {
  const { countries } = await getCountries();
  const {
    user: { id: userId },
  } = (await auth()) ?? { user: { id: "no-id" } };
  const { userAddressFound } = await getUserAddress({ userId });

  return (
    <div className="col-start-1 px-4 col-span-4 md:col-span-8 lg:col-span-12 ">
      <TitlePage title="Dirección" subTitle="Dirección de entrega" />
      <CheckoutAddressForm
        countries={countries}
        userId={userId}
        userStoredAddress={userAddressFound}
      />
    </div>
  );
}
