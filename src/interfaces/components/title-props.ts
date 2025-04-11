import { ComponentPropsWithoutRef } from "react";

interface TitleProps extends ComponentPropsWithoutRef<"div"> {
  title: string;
  subTitle?: string;
  size?: "s" | "m" | "l";
}

export type { TitleProps };
