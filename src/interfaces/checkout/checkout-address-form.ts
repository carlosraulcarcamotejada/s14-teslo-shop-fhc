import { ComponentPropsWithoutRef } from "react";
import { Address } from "@/interfaces/shared/address";
import { Country } from "@/interfaces/shared/country";

interface CheckoutAddressProps extends ComponentPropsWithoutRef<"div"> {
  countries: Country[];
  userId: string;
  userStoredAddress?: Address;
}

export type { CheckoutAddressProps };
