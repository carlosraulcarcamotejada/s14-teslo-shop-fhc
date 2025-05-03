import LinkFromNext, { LinkProps as LinkPropsFromNext } from "next/link";
import { type ClassValue } from "clsx";
import { cn } from "@/lib/utils";

interface LinkProps extends LinkPropsFromNext {
  className?: ClassValue;
  children?: React.ReactNode;
}

const Link = ({ className, children, ...rest }: LinkProps) => {
  return (
    <LinkFromNext
      {...rest}
      className={cn("underline-offset-4 hover:underline", className)}
    >
      {children}
    </LinkFromNext>
  );
};

export { Link };
