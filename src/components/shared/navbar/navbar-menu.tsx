"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
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
import {
  ListOrderedIcon,
  LogIn,
  LogOut,
  SearchIcon,
  UserIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  NavbarMenuItem,
  NavbarMenuItemProps,
} from "@/components/shared/navbar/navbar-menu-item";
import { Session } from "next-auth";
import { logout } from "@/actions/auth/logout";

const menuItems: NavbarMenuItemProps[] = [
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
    onClick: logout,
  },
];

const menuItemsAdmin: NavbarMenuItemProps[] = [
  {
    title: "Productos",
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
    title: "Usuarios",
    path: "/auth/login",
    icon: LogIn,
    id: 3,
  },
];

interface NavbarMenuProps {
  session: Session | null;
}

export const NavbarMenu = ({ session }: NavbarMenuProps) => {
  const user = session?.user;
  const isAuthenticated: boolean = typeof user === "object";

  const isAdmin: boolean = typeof user === "object" && user.role === "admin";

  return (
    <Sheet>
      <SheetTrigger className={cn("")} asChild>
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
              id="name"
              autoFocus={false}
              className="col-span-4 pl-10"
              type="search"
            />
          </div>
        </SheetHeader>
        <ScrollArea className="w-full h-full px-0 pb-4">
          <div className="grid grid-cols-4 items-center gap-y-4 mt-4">
            {menuItems.map((menuItem) => {
              return isAuthenticated && menuItem.title !== "Ingresar" ? (
                <NavbarMenuItem key={menuItem.id} {...menuItem} />
              ) : !isAuthenticated && menuItem.title === "Ingresar" ? (
                <NavbarMenuItem key={menuItem.id} {...menuItem} />
              ) : null;
            })}

            <Separator orientation="horizontal" className="col-span-4" />

            {isAdmin &&
              menuItemsAdmin.map((menuItemAdmin) => (
                <NavbarMenuItem key={menuItemAdmin.id} {...menuItemAdmin} />
              ))}
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
