"use client";
import { ComponentPropsWithoutRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { NavbarContent, NavbarItem } from "@heroui/navbar";
import { buttonVariants } from "@/components/ui/button";

interface Path {
  id: number;
  label: string;
  path: string;
}

interface NavbarLinksProps extends ComponentPropsWithoutRef<"ul"> {
  paths: Path[];
}

export const NavbarLinks = ({
  className,
  paths,
  ...props
}: NavbarLinksProps) => {
  const pathname = usePathname();

  return (
    <NavbarContent
      {...props}
      className={cn("hidden sm:flex gap-4", className)}
      justify="center"
    >
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
  );
};

export type { Path };
