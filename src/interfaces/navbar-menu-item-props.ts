import { IconTypeLucideProps } from "@/interfaces/icon/icon-type-lucide-props";

interface NavbarMenuItemProps {
  path?: string;
  icon: IconTypeLucideProps;
  title: string;
  id: number;
  type?: "link" | "button";
  onClick?: () => void;
}

export type { NavbarMenuItemProps };
