"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
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
import { SearchIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  NavbarMenuItem,
  NavbarMenuItemProps,
} from "@/components/shared/navbar/navbar-menu-item";

interface NavbarMenuProps {
  navbarMenuItems: NavbarMenuItemProps[];
}

export const NavbarMenu = ({ navbarMenuItems }: NavbarMenuProps) => {
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
       

            {navbarMenuItems.map((navbarMenuItem) => (
              <NavbarMenuItem key={navbarMenuItem.id} {...navbarMenuItem} />
            ))}

            <Separator orientation="horizontal" className="col-span-4" />
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
