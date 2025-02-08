"use client";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@heroui/navbar";
import { Badge } from "@heroui/badge";
import {
  Calendar,
  Home,
  Inbox,
  LogInIcon,
  LogOutIcon,
  Search,
  SearchIcon,
  Settings,
  ShirtIcon,
  ShoppingCart,
  TicketIcon,
  UserIcon,
  UsersIcon,
} from "lucide-react";
import { AcmeLogo } from "@/components/icon/acme-logo";
import { Separator } from "@/components/ui/separator";
import { usePathname } from "next/navigation";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { titleFont } from "@/config/fonts";
import { ScrollArea } from "../ui/scroll-area";
import { useEffect, useRef } from "react";
import { ClassValue } from "clsx";
import { cn } from "@/lib/utils";

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

// Menu items.
const items = [
  {
    title: "Home",
    url: "#",
    icon: Home,
  },
  {
    title: "Inbox",
    url: "#",
    icon: Inbox,
  },
  {
    title: "Calendar",
    url: "#",
    icon: Calendar,
  },
  {
    title: "Search",
    url: "#",
    icon: Search,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
];

export const TopBar = () => {
  const pathname = usePathname();

  return (
    <Navbar isBordered maxWidth="full" isBlurred={false}>
      {/* Brand Logo */}
      <NavbarBrand className="h-6">
        <NavbarLogo />
      </NavbarBrand>
      {/* Center Content */}
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {paths.map(({ id, label, path }) => {
          const isCurrentPath: boolean = path === pathname;
          return (
            <NavbarItem key={id}>
              <Link
                className={buttonVariants({
                  variant: isCurrentPath ? "default" : "ghost",
                })}
                href={path}
              >
                {label}
              </Link>
            </NavbarItem>
          );
        })}
      </NavbarContent>
      {/* End Content */}
      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Link href="#" className={buttonVariants({ variant: "ghost" })}>
            <Search />
          </Link>
        </NavbarItem>
        <NavbarItem className="hidden lg:flex">
          <Badge color="primary" content="5" size="lg">
            <Link href="/cart" className={buttonVariants({ variant: "ghost" })}>
              <ShoppingCart />
            </Link>
          </Badge>
        </NavbarItem>
        <NavbarItem>
          <MenuTopBar />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};

const MenuTopBar = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      setTimeout(() => {
        inputRef.current?.blur(); // Remueve el foco después de abrir el Sheet
      }, 0);
    }
  }, []);
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="md" variant="outline">
          Menú
        </Button>
      </SheetTrigger>
      <SheetContent className="border pt-10 pb-28 px-2 lg:px-4 bg-sidebar text-sidebar-foreground text-sm">
        <SheetHeader className="">
          <SheetTitle className="hidden" />
          <SheetDescription className="hidden" />
          <div className="relative p-1">
            <SearchIcon className="size-4 absolute top-1/2 left-4 -translate-y-1/2" />
            <Input
              ref={inputRef}
              id="name"
              autoFocus={false}
              className="col-span-4 pl-10"
              type="search"
            />
          </div>
        </SheetHeader>
        <ScrollArea className="w-full h-full px-0 pb-4">
          <div className="grid grid-cols-4 items-center gap-y-4 mt-4">
            <SheetClose asChild>
              <Link
                className="col-span-4 w-full px-2 flex justify-start items-center gap-x-3 h-10 rounded-md hover:bg-accent transition-all duration-75"
                href="#"
              >
                <UserIcon className="size-4" />
                <span className="text-md">Perfil</span>
              </Link>
            </SheetClose>
            <SheetClose asChild>
              <Link
                className="col-span-4 w-full px-2 flex justify-start items-center gap-x-3 h-10 rounded-md hover:bg-accent transition-all duration-75"
                href="#"
              >
                <TicketIcon className="size-4" />
                <span className="">Ordenes</span>
              </Link>
            </SheetClose>
            <SheetClose asChild>
              <Link
                className="col-span-4 w-full px-2 flex justify-start items-center gap-x-3 h-10 rounded-md hover:bg-accent transition-all duration-75"
                href="#"
              >
                <LogInIcon className="size-4" />
                <span className="">Ingresar</span>
              </Link>
            </SheetClose>
            <SheetClose asChild>
              <Link
                className="col-span-4 w-full px-2 flex justify-start items-center gap-x-3 h-10 rounded-md hover:bg-accent transition-all duration-75"
                href="#"
              >
                <LogOutIcon className="size-4" />
                <span className="">Salir</span>
              </Link>
            </SheetClose>

            <Separator orientation="horizontal" className="col-span-4" />

            <SheetClose asChild>
              <Link
                className="col-span-4 w-full px-2 flex justify-start items-center gap-x-3 h-10 rounded-md hover:bg-accent transition-all duration-75"
                href="#"
              >
                <ShirtIcon className="size-4" />
                <span className="">Productos</span>
              </Link>
            </SheetClose>
            <SheetClose asChild>
              <Link
                className="col-span-4 w-full px-2 flex justify-start items-center gap-x-3 h-10 rounded-md hover:bg-accent transition-all duration-75"
                href="#"
              >
                <TicketIcon className="size-4" />
                <span className="">Ordenes</span>
              </Link>
            </SheetClose>

            <SheetClose asChild>
              <Link
                className="col-span-4 w-full px-2 flex justify-start items-center gap-x-3 h-10 rounded-md hover:bg-accent transition-all duration-75"
                href="#"
              >
                <UsersIcon className="size-4" />
                <span className="">Usuarios</span>
              </Link>
            </SheetClose>

            <SheetClose asChild>
              <Link
                className="col-span-4 w-full px-2 flex justify-start items-center gap-x-3 h-10 rounded-md hover:bg-accent transition-all duration-75"
                href="#"
              >
                <ShirtIcon className="size-4" />
                <span className="">Productos</span>
              </Link>
            </SheetClose>

            <SheetClose asChild>
              <Link
                className="col-span-4 w-full px-2 flex justify-start items-center gap-x-3 h-10 rounded-md hover:bg-accent transition-all duration-75"
                href="#"
              >
                <TicketIcon className="size-4" />
                <span className="">Ordenes</span>
              </Link>
            </SheetClose>

            <SheetClose asChild>
              <Link
                className="col-span-4 w-full px-2 flex justify-start items-center gap-x-3 h-10 rounded-md hover:bg-accent transition-all duration-75"
                href="#"
              >
                <UsersIcon className="size-4" />
                <span className="">Usuarios</span>
              </Link>
            </SheetClose>

            <SheetClose asChild>
              <Link
                className="col-span-4 w-full px-2 flex justify-start items-center gap-x-3 h-10 rounded-md hover:bg-accent transition-all duration-75"
                href="#"
              >
                <ShirtIcon className="size-4" />
                <span className="">Productos</span>
              </Link>
            </SheetClose>

            <SheetClose asChild>
              <Link
                className="col-span-4 w-full px-2 flex justify-start items-center gap-x-3 h-10 rounded-md hover:bg-accent transition-all duration-75"
                href="#"
              >
                <TicketIcon className="size-4" />
                <span className="">Ordenes</span>
              </Link>
            </SheetClose>

            <SheetClose asChild>
              <Link
                className="col-span-4 w-full px-2 flex justify-start items-center gap-x-3 h-10 rounded-md hover:bg-accent transition-all duration-75"
                href="#"
              >
                <UsersIcon className="size-4" />
                <span className="">Usuarios</span>
              </Link>
            </SheetClose>

            <SheetClose asChild>
              <Link
                className="col-span-4 w-full px-2 flex justify-start items-center gap-x-3 h-10 rounded-md hover:bg-accent transition-all duration-75"
                href="#"
              >
                <ShirtIcon className="size-4" />
                <span className="">Productos</span>
              </Link>
            </SheetClose>

            <SheetClose asChild>
              <Link
                className="col-span-4 w-full px-2 flex justify-start items-center gap-x-3 h-10 rounded-md hover:bg-accent transition-all duration-75"
                href="#"
              >
                <TicketIcon className="size-4" />
                <span className="">Ordenes</span>
              </Link>
            </SheetClose>

            <SheetClose asChild>
              <Link
                className="col-span-4 w-full px-2 flex justify-start items-center gap-x-3 h-10 rounded-md hover:bg-accent transition-all duration-75"
                href="#"
              >
                <UsersIcon className="size-4" />
                <span className="">Usuarios</span>
              </Link>
            </SheetClose>
          </div>
        </ScrollArea>

        <SheetFooter className="">
          <SheetClose asChild>
            <Button className="w-full">Save changes</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

interface NavbarLogoProps {
  className?: ClassValue;
}
export const NavbarLogo = ({ className }: NavbarLogoProps) => {
  return (
    <Link
      href="/"
      className={cn("flex items-center h-full space-x-2", className)}
    >
      <AcmeLogo />
      <Separator orientation="vertical" />
      <p
        className={`${titleFont.className} antialiased font-bold text-inherit`}
      >
        Teslo shop
      </p>
    </Link>
  );
};
