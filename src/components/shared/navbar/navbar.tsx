"use client";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import {
  Navbar as NavbarHUI,
  NavbarBrand as NavbarBrandHUI,
  NavbarContent as NavbarContentHUI,
  NavbarItem as NavbarItemHUI,
} from "@heroui/navbar";
import { ListOrderedIcon, LogIn, LogOut, Search, UserIcon } from "lucide-react";
import { NavbarBrandLogo } from "@/components/shared/navbar/navbar-brand-logo";
import { NavbarLinks } from "@/components/shared/navbar/navbar-links";
import { NavbarMenu } from "@/components/shared/navbar/navbar-menu";
import { NavbarMenuItemProps } from "@/components/shared/navbar/navbar-menu-item";
import { NavbarShoppingCart } from "./navbar-shopping-cart";

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
    title: "Perfil",
    path: "/profile",
    icon: UserIcon,
    id: 1,
  },

  {
    title: "Ordenes",
    path: "#",
    icon: ListOrderedIcon,
    id: 2,
  },

  {
    title: "Ingresar",
    path: "/auth/login",
    icon: LogIn,
    id: 3,
  },

  {
    title: "Salir",
    icon: LogOut,
    id: 7,
    type: "button",
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
        <NavbarShoppingCart />
        <NavbarItemHUI>
          <NavbarMenu navbarMenuItems={MenuItems} />
        </NavbarItemHUI>
      </NavbarContentHUI>
    </NavbarHUI>
  );
};
