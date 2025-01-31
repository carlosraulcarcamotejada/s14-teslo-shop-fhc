"use client";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@heroui/navbar";
import { Badge } from "@heroui/badge";
import {
  LogInIcon,
  LogOutIcon,
  Search,
  SearchIcon,
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
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { titleFont } from "@/config/fonts";

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

export const TopBar = () => {
  const pathname = usePathname();
  return (
    <Navbar isBordered maxWidth="full">
      {/* Brand Logo */}
      <NavbarBrand>
        <Link href="/" className="flex items-center h-6 space-x-2">
          <AcmeLogo />
          <Separator orientation="vertical" />
          <p
            className={`${titleFont.className} antialiased font-bold text-inherit`}
          >
            Teslo shop
          </p>
        </Link>
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
          <Sheet>
            <SheetTrigger asChild>
              <Button size="md" variant="outline">
                Menú
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader className="hidden">
                <SheetTitle>Side Menu</SheetTitle>
                <SheetDescription />
              </SheetHeader>
              <div className="grid gap-y-10 py-10">
                <div className="grid grid-cols-4 items-center gap-4 relative">
                  <SearchIcon className="size-4 absolute top-1/2 left-2 -translate-y-1/2" />
                  <Input id="name" className="col-span-4 pl-8" type="search" />
                </div>
                <div className="grid grid-cols-4 items-center gap-y-4">
                  <Link
                    className="col-span-4 w-full px-2 flex justify-start items-center gap-x-3 h-12 rounded-md hover:bg-accent transition-all duration-75"
                    href="#"
                  >
                    <UserIcon className="size-6" />
                    <span className="">Perfil</span>
                  </Link>
                  <Link
                    className="col-span-4 w-full px-2 flex justify-start items-center gap-x-3 h-12 rounded-md hover:bg-accent transition-all duration-75"
                    href="#"
                  >
                    <TicketIcon className="size-6" />
                    <span className="">Ordenes</span>
                  </Link>
                  <Link
                    className="col-span-4 w-full px-2 flex justify-start items-center gap-x-3 h-12 rounded-md hover:bg-accent transition-all duration-75"
                    href="#"
                  >
                    <LogInIcon className="size-6" />
                    <span className="">Ingresar</span>
                  </Link>
                  <Link
                    className="col-span-4 w-full px-2 flex justify-start items-center gap-x-3 h-12 rounded-md hover:bg-accent transition-all duration-75"
                    href="#"
                  >
                    <LogOutIcon className="size-6" />
                    <span className="">Salir</span>
                  </Link>

                  <Separator
                    orientation="horizontal"
                    className="my-6 col-span-4"
                  />

                  <Link
                    className="col-span-4 w-full px-2 flex justify-start items-center gap-x-3 h-12 rounded-md hover:bg-accent transition-all duration-75"
                    href="#"
                  >
                    <ShirtIcon className="size-6" />
                    <span className="">Productos</span>
                  </Link>
                  <Link
                    className="col-span-4 w-full px-2 flex justify-start items-center gap-x-3 h-12 rounded-md hover:bg-accent transition-all duration-75"
                    href="#"
                  >
                    <TicketIcon className="size-6" />
                    <span className="">Ordenes</span>
                  </Link>
                  <Link
                    className="col-span-4 w-full px-2 flex justify-start items-center gap-x-3 h-12 rounded-md hover:bg-accent transition-all duration-75"
                    href="#"
                  >
                    <UsersIcon className="size-6" />
                    <span className="">Usuarios</span>
                  </Link>
                </div>
              </div>
              {/* <SheetFooter>
                <SheetClose asChild>
                  <Button type="submit">Save changes</Button>
                </SheetClose>
              </SheetFooter> */}
            </SheetContent>
          </Sheet>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};
