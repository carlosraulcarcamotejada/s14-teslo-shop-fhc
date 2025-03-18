import { ComponentPropsWithoutRef } from "react";
import { Country } from "@/seed/seed";
import { Address } from "@/interfaces/address";

interface CheckoutAddressProps extends ComponentPropsWithoutRef<"div"> {
  countries: Country[];
  userId: string;
  userStoredAddress?: Address;
}

export type { CheckoutAddressProps };
