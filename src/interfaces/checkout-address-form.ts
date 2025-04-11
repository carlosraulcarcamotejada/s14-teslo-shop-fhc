import { ComponentPropsWithoutRef } from "react";
import { Address } from "@/interfaces/address";
import { Country } from "@/interfaces/country";

interface CheckoutAddressProps extends ComponentPropsWithoutRef<"div"> {
  countries: Country[];
  userId: string;
  userStoredAddress?: Address;
}

export type { CheckoutAddressProps };
