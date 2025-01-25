import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@heroui/navbar";
import { Search, ShoppingCart } from "lucide-react";
import { TopBarMenuLinks } from "@/components/shared/top-bar/components/top-bar-menu-links";
import { AcmeLogo } from "@/components/icons/acme-logo";
import { Separator } from "@/components/ui/separator";

export const TopBar = () => {
  return (
    <Navbar isBordered>
      {/* Brand Logo */}
      <NavbarBrand>
        <Link href="/" className="flex  items-center h-5 space-x-2">
          <AcmeLogo />
          <Separator orientation="vertical" />
          <p className="font-bold text-inherit">Teslo</p>
        </Link>
      </NavbarBrand>
      {/* Center Content */}
      <TopBarMenuLinks />
      {/* End Content */}
      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Button size="md" variant="ghost" asChild color="red-500">
            <Link href="#">
              <Search />
            </Link>
          </Button>
        </NavbarItem>
        <NavbarItem className="hidden lg:flex">
          <Button size="md" variant="ghost" asChild>
            <Link href="/cart">
              <ShoppingCart />
            </Link>
          </Button>
        </NavbarItem>
        <NavbarItem>
          <Button size={"md"} variant="outline">
            Menú
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};
