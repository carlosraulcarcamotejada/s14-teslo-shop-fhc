import LinkFromNext, { LinkProps as LinkPropsFromNext } from "next/link";
import { type ClassValue } from "clsx";
import { cn } from "@/lib/utils";

interface LinkProps extends LinkPropsFromNext {
  className?: ClassValue;
  children?: React.ReactNode;
  disabled?: boolean;
}

const Link = ({
  className,
  children,
  href,
  disabled = false,
  ...rest
}: LinkProps) => {
  return (
    <LinkFromNext
      {...rest}
      href={disabled ? "#" : href}
      className={cn(
        "hover:underline underline-offset-4",
        disabled && "pointer-events-none opacity-50 cursor-not-allowed",
        className
      )}
    >
      {children}
    </LinkFromNext>
  );
};

export { Link };
