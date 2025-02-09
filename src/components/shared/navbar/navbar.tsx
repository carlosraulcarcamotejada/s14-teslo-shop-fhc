"use client";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import {
  Navbar as NavbarHUI,
  NavbarBrand as NavbarBrandHUI,
  NavbarContent as NavbarContentHUI,
  NavbarItem as NavbarItemHUI,
} from "@heroui/navbar";
import { Badge } from "@heroui/badge";
import {
  Calendar,
  Home,
  Inbox,
  Search,
  Settings,
  ShoppingCart,
} from "lucide-react";
import { NavbarBrandLogo } from "@/components/shared/navbar/navbar-brand-logo";
import { NavbarLinks } from "@/components/shared/navbar/navbar-links";
import { NavbarMenu } from "@/components/shared/navbar/navbar-menu";
import { NavbarMenuItemProps } from "@/components/shared/navbar/navbar-menu-item";

interface Path {
  id: number;
  label: string;
  path: string;
}

const paths: Path[] = [
  { id: 1, label: "Hombres", path: "/category/men" },
  { id: 2, label: "Mujeres", path: "/category/women" },
  { id: 3, label: "Niños", path: "/category/kid" },
];

const MenuItems: NavbarMenuItemProps[] = [
  {
    title: "Home",
    url: "#",
    icon: Home,
    id: 1,
  },
  {
    title: "Inbox",
    url: "#",
    icon: Inbox,
    id: 2,
  },
  {
    title: "Calendar",
    url: "#",
    icon: Calendar,
    id: 3,
  },
  {
    title: "Search",
    url: "#",
    icon: Search,
    id: 4,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
    id: 5,
  },
];

export const Navbar = () => {
  return (
    <NavbarHUI isBordered maxWidth="full" isBlurred={false}>
      {/* Brand Logo */}
      <NavbarBrandHUI className="h-6">
        <NavbarBrandLogo />
      </NavbarBrandHUI>
      {/* Center Content */}
      <NavbarLinks paths={paths} />
      {/* End Content */}
      <NavbarContentHUI justify="end">
        <NavbarItemHUI className="hidden lg:flex">
          <Link href="#" className={buttonVariants({ variant: "ghost" })}>
            <Search />
          </Link>
        </NavbarItemHUI>
        <NavbarItemHUI className="hidden lg:flex">
          <Badge color="primary" content="5" size="lg">
            <Link href="/cart" className={buttonVariants({ variant: "ghost" })}>
              <ShoppingCart />
            </Link>
          </Badge>
        </NavbarItemHUI>
        <NavbarItemHUI>
          <NavbarMenu navbarMenuItems={MenuItems} />
        </NavbarItemHUI>
      </NavbarContentHUI>
    </NavbarHUI>
  );
};
