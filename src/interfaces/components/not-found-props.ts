import { ComponentPropsWithoutRef } from "react";
import { IconTypeLucideProps } from "@/interfaces/icon/icon-type-lucide-props";

interface NotFoundProps extends ComponentPropsWithoutRef<"div"> {
  title?: string;
  subTitle?: string;
  show404?: boolean;
  buttonProps?: {
    label: string;
    icon: IconTypeLucideProps;
    onClick: () => void;
  };
}

export type { NotFoundProps };
