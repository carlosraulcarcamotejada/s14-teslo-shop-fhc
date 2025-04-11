"use client";
import { Button } from "@/components/ui/button";
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
  MenuIcon,
  PackageIcon,
  UserIcon,
  UsersIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  NavbarMenuItem,
  NavbarMenuItemProps,
} from "@/components/shared/navbar/navbar-menu-item";
import { logout } from "@/actions/auth/logout";
import { NavbarMenuProps } from "@/interfaces/navbar-menu-props";
import { useCart } from "@/hooks/use-cart";

export const NavbarMenu = ({ session }: NavbarMenuProps) => {
  const { clearCart } = useCart();

  const menuItems: NavbarMenuItemProps[] = [
    {
      title: "Perfil",
      path: "/profile",
      icon: UserIcon,
      id: 1,
    },

    {
      title: "Ordenes",
      path: "/orders",
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
      onClick: () => {
        clearCart();
        logout();
      },
    },
  ];

  const menuItemsAdmin: NavbarMenuItemProps[] = [
    {
      title: "Productos",
      path: "/admin/products",
      icon: PackageIcon,
      id: 1,
    },

    {
      title: "Ordenes",
      path: "/admin/orders",
      icon: ListOrderedIcon,
      id: 2,
    },

    {
      title: "Usuarios",
      path: "/admin/users",
      icon: UsersIcon,
      id: 3,
    },
  ];

  const user = session?.user;
  const isAuthenticated: boolean = typeof user === "object";

  const isAdmin: boolean = typeof user === "object" && user.role === "admin";

  return (
    <Sheet>
      <SheetTrigger className={cn("")} asChild>
        <Button size="md" variant="outline">
          <MenuIcon />
        </Button>
      </SheetTrigger>
      <SheetContent className="border bg-yellow-400 h-full px-0 bg-sidebar text-sidebar-foreground text-sm">
        <SheetHeader className="">
          <SheetTitle className="hidden" />
          <SheetDescription className="hidden" />
        </SheetHeader>
        <ScrollArea className="w-full h-full">
          <div className="grid grid-cols-4 items-center gap-y-4 mt-4">
            {menuItems.map((menuItem: NavbarMenuItemProps) => {
              if (isAuthenticated && menuItem.title !== "Ingresar") {
                if (menuItem.title === "Ordenes" && isAdmin) {
                  return null; // No mostrar "Ordenes" si el usuario es admin
                }
                return <NavbarMenuItem key={menuItem.id} {...menuItem} />;
              }

              if (!isAuthenticated && menuItem.title === "Ingresar") {
                return <NavbarMenuItem key={menuItem.id} {...menuItem} />;
              }

              return null;
            })}

            <Separator orientation="horizontal" className="col-span-4" />

            {isAdmin &&
              menuItemsAdmin.map((menuItemAdmin: NavbarMenuItemProps) => (
                <NavbarMenuItem key={menuItemAdmin.id} {...menuItemAdmin} />
              ))}
          </div>
        </ScrollArea>

        <SheetFooter className="hidden">
          <SheetClose asChild>
            <Button className="w-full">Save changes</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
