"use client";
import Link from "next/link";
import { useSelector } from "react-redux";
import { NavbarItem } from "@heroui/navbar";
import { Badge } from "@heroui/badge";
import { ShoppingCart } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { selectTotalItems } from "@/store/selectors";

export const NavbarShoppingCart = () => {
  const totalItems = useSelector(selectTotalItems);

  return (
    <NavbarItem className="hidden lg:flex">
      {totalItems > 0 ? (
        <Badge color="primary" content={totalItems} size="lg">
          <Link href="/cart" className={buttonVariants({ variant: "ghost" })}>
            <ShoppingCart />
          </Link>
        </Badge>
      ) : (
        <Link href="/empty" className={buttonVariants({ variant: "ghost" })}>
          <ShoppingCart />
        </Link>
      )}
    </NavbarItem>
  );
};
