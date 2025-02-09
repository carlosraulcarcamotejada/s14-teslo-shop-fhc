import { ForwardRefExoticComponent, RefAttributes } from "react";
import Link from "next/link";
import { SheetClose } from "@/components/ui/sheet";
import { LucideProps } from "lucide-react";

interface NavbarMenuItemProps {
  url: string;
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
  title: string;
  id: number;
}

export const NavbarMenuItem = ({
  icon: Icon,
  url,
  title,
}: NavbarMenuItemProps) => {
  return (
    <SheetClose asChild>
      <Link
        className="col-span-4 w-full px-2 flex justify-start items-center gap-x-3 h-10 rounded-md hover:bg-accent transition-all duration-75"
        href={url}
      >
        {/* <UserIcon className="size-4" /> */}
        <Icon className="size-4" />
        <span className="text-md">{title}</span>
      </Link>
    </SheetClose>
  );
};

export type { NavbarMenuItemProps };
