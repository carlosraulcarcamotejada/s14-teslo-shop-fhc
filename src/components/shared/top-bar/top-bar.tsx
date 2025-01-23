import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
  Badge,
} from "@heroui/react";
import { SearchIcon, ShoppingCart } from "lucide-react";
import { TopBarMenu } from "./components/top-bar-menu";
import { TopBarMenuToggle } from "@/components/shared/top-bar/components/top-bar-menu-toggle";
import { TopBarMenuTabs } from "@/components/shared/top-bar/components/top-bar-menu-tabs";
import Link from "next/link";
import { AcmeLogo } from "@/components/icons/acme-logo";

export const TopBar = () => {
  return (
    <Navbar isBordered>
      {/* Start Section (Brand) */}
      <NavbarBrand>
        <Link
          className="cursor-pointer flex items-center gap-x-4 sm:gap-x-0"
          href="/"
        >
          <TopBarMenuToggle />
          <AcmeLogo />
          <p className="font-bold text-inherit">Teslo</p>
        </Link>
      </NavbarBrand>
      {/* Center Section */}
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <TopBarMenuTabs />
      </NavbarContent>
      {/* End Section */}
      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Button as={Link} href="/search" variant="light" size="sm">
            <SearchIcon className="size-4" />
          </Button>
        </NavbarItem>
        <NavbarItem className="hidden lg:flex">
          <Badge color="primary" content="5">
            <Button as={Link} href="/cart" variant="light" size="sm">
              <ShoppingCart className="size-4" />
            </Button>
          </Badge>
        </NavbarItem>
        <NavbarItem>
          <Button color="secondary" variant="flat" size="sm">
            Menu
          </Button>
        </NavbarItem>
      </NavbarContent>
      {/* Menu For Mobile  */}
      <TopBarMenu />
    </Navbar>
  );
};
