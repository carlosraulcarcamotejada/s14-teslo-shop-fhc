import { ForwardRefExoticComponent, RefAttributes } from "react";
import Link from "next/link";
import { SheetClose } from "@/components/ui/sheet";
import { LucideProps } from "lucide-react";
import { logout } from "@/actions/auth/logout";

interface NavbarMenuItemProps {
  path?: string;
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
  title: string;
  id: number;
  type?: "link" | "button";
}

export const NavbarMenuItem = ({
  icon: Icon,
  path,
  title,
  type = "link",
}: NavbarMenuItemProps) => {
  return (
    <SheetClose asChild>
      {type === "link" && path ? (
        <Link
          className="col-span-4 w-full px-2 flex justify-start items-center gap-x-3 h-10 rounded-md hover:bg-accent transition-all duration-75"
          href={path}
        >
          {/* <UserIcon className="size-4" /> */}
          <Icon className="size-4" />
          <span className="text-md">{title}</span>
        </Link>
      ) : (
        <button
          onClick={logout}
          className="col-span-4 w-full px-2 flex justify-start items-center gap-x-3 h-10 rounded-md hover:bg-accent transition-all duration-75"
        >
          {/* <UserIcon className="size-4" /> */}
          <Icon className="size-4" />
          <span className="text-md">{title}</span>
        </button>
      )}
    </SheetClose>
  );
};

export type { NavbarMenuItemProps };
