import { ComponentPropsWithoutRef } from "react";

interface TitleProps extends ComponentPropsWithoutRef<"div"> {
  title: string;
  subTitle?: string;
}

export type { TitleProps };
