import { getUserAddress } from "@/actions/address/get-user-address";
import { getCountries } from "@/actions/checkout/get-countries";
import { CheckoutAddressForm } from "@/components/checkout/checkout-address-form";
import { TitlePage } from "@/components/shared/title-page";
import { auth } from "@/config/auth.config";

export default async function AddressPage() {
  const countries = await getCountries();
  const session = (await auth()) ?? { user: { id: "no-id" } };
  const userStoredAddress = await getUserAddress(session.user.id);

  return (
    <div className="col-start-1 px-4 col-span-4 md:col-span-8 lg:col-span-12 ">
      <TitlePage title="Dirección" subTitle="Dirección de entrega" />
      <CheckoutAddressForm
        countries={countries}
        userId={session?.user?.id}
        userStoredAddress={userStoredAddress}
      />
    </div>
  );
}
