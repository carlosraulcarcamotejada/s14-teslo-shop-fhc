import {
  Navbar as NavbarHUI,
  NavbarBrand as NavbarBrandHUI,
  NavbarContent as NavbarContentHUI,
  NavbarItem as NavbarItemHUI,
} from "@heroui/navbar";
import { NavbarLinks } from "@/components/shared/navbar/navbar-links";
import { NavbarMenu } from "@/components/shared/navbar/navbar-menu";
import { NavbarShoppingCart } from "./navbar-shopping-cart";
import { auth } from "@/config/auth.config";
import { NavbarBrandLogo } from "@/components/shared/navbar/navbar-brand-logo";
import { NavbarSearchButton } from "./navbar-search-button";

export const Navbar = async () => {
  const session = await auth();

  return (
    <NavbarHUI isBordered maxWidth="full" isBlurred={false}>
      {/* Brand Logo */}
      <NavbarBrandHUI className="h-6">
        <NavbarBrandLogo />
      </NavbarBrandHUI>
      {/* Center Content */}
      <NavbarLinks />
      {/* End Content */}
      <NavbarContentHUI justify="end">
        <NavbarItemHUI className="hidden lg:flex">
          <NavbarSearchButton />
        </NavbarItemHUI>
        <NavbarShoppingCart />
        <NavbarItemHUI>
          <NavbarMenu session={session} />
        </NavbarItemHUI>
      </NavbarContentHUI>
    </NavbarHUI>
  );
};
