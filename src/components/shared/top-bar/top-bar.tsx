import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@heroui/navbar";
import { Search, ShoppingCart } from "lucide-react";
import { TopBarMenuLinks } from "@/components/shared/top-bar/components/top-bar-menu-links";
import { AcmeLogo } from "@/components/icons/acme-logo";
import { cn } from "@/lib/utils";

export const TopBar = () => {
  return (
    <Navbar isBordered>
      {/* Brand Logo */}
      <NavbarBrand>
        <Link href="/" className="flex  items-center">
          <AcmeLogo />
          <p className="font-bold text-inherit">Teslo</p>
        </Link>
      </NavbarBrand>
      {/* Center Content */}
      <TopBarMenuLinks />
      {/* End Content */}
      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Link
            href="/cart"
            className={cn(buttonVariants({ size: "md", variant: "ghost" }))}
          >
            <Search />
          </Link>
        </NavbarItem>
        <NavbarItem className="hidden lg:flex">
          <Link
            className={cn(buttonVariants({ size: "md", variant: "ghost" }))}
            href="/cart"
          >
            <ShoppingCart />
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Button size={"md"} variant="ghost">
            Menú
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};
