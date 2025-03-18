"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { NavbarContent, NavbarItem } from "@heroui/navbar";
import { buttonVariants } from "@/components/ui/button";
import { Path } from "@/interfaces/path";
import { NavbarLinksProps } from "@/interfaces/navbar-links-props";

const paths: Path[] = [
  { id: 1, label: "Hombres", path: "/category/men" },
  { id: 2, label: "Mujeres", path: "/category/women" },
  { id: 3, label: "Niños", path: "/category/kid" },
];

export const NavbarLinks = ({
  className,

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
