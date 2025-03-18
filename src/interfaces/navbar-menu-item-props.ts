import { ForwardRefExoticComponent, RefAttributes } from "react";
import { LucideProps } from "lucide-react";

interface NavbarMenuItemProps {
  path?: string;
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
  title: string;
  id: number;
  type?: "link" | "button";
  onClick?: () => void;
}

export type { NavbarMenuItemProps };
