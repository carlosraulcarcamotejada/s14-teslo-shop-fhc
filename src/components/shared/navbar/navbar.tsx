import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import {
  Navbar as NavbarHUI,
  NavbarBrand as NavbarBrandHUI,
  NavbarContent as NavbarContentHUI,
  NavbarItem as NavbarItemHUI,
} from "@heroui/navbar";
import { Search } from "lucide-react";
import { NavbarBrandLogo } from "@/components/shared/navbar/navbar-brand-logo";
import { NavbarLinks } from "@/components/shared/navbar/navbar-links";
import { NavbarMenu } from "@/components/shared/navbar/navbar-menu";
import { NavbarShoppingCart } from "./navbar-shopping-cart";
import { auth } from "@/config/auth.config";

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
          <Link href="#" className={buttonVariants({ variant: "ghost" })}>
            <Search />
          </Link>
        </NavbarItemHUI>
        <NavbarShoppingCart />
        <NavbarItemHUI>
          <NavbarMenu session={session} />
        </NavbarItemHUI>
      </NavbarContentHUI>
    </NavbarHUI>
  );
};
