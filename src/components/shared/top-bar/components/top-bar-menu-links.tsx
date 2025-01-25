"use client";
import Link from "next/link";
import { NavbarContent, NavbarItem } from "@heroui/navbar";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { usePathname } from "next/navigation";

interface Path {
  id: number;
  label: string;
  path: string;
}

const paths: Path[] = [
  { id: 1, label: "Hombres", path: "/category/hombres" },
  { id: 2, label: "Mujeres", path: "/category/mujeres" },
  { id: 3, label: "Niños", path: "/category/ninos" },
];

export const TopBarMenuLinks = () => {
  const pathname = usePathname();

  return (
    <NavbarContent className="hidden sm:flex gap-4" justify="center">
      {paths.map(({ id, label, path }) => {
        const isCurrentPath: boolean = path === pathname;
        return (
          <NavbarItem key={id}>
            <Link
              className={cn(
                buttonVariants({
                  size: "md",
                  variant: isCurrentPath ? "secondary" : "ghost",
                }),"font-semibold@"
              )}
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
