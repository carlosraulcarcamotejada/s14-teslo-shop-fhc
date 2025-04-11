import Link from "next/link";
import { SheetClose } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { NavbarMenuItemProps } from "@/interfaces/components/navbar-menu-item-props";

export const NavbarMenuItem = ({
  icon: Icon,
  path,
  title,
  onClick,
  type = "link",
}: NavbarMenuItemProps) => {
  const navbarItemClass =
    "col-span-4 w-full px-4 flex justify-start items-center gap-x-3 h-10 rounded-md hover:bg-accent transition-all duration-75";

  return (
    <SheetClose asChild>
      {type === "link" && path ? (
        <Link className={navbarItemClass} href={path}>
          <Icon className="size-4" />
          <span className="text-md">{title}</span>
        </Link>
      ) : (
        <Button
          className={navbarItemClass}
          onClick={() => typeof onClick === "function" && onClick()}
          variant={"ghost"}
        >
          <Icon className="size-4" />
          <span className="text-md">{title}</span>
        </Button>
      )}
    </SheetClose>
  );
};

export type { NavbarMenuItemProps };
