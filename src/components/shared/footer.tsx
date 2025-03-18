import { cn } from "@/lib/utils";
import { NavbarBrandLogo } from "@/components/shared/navbar/navbar-brand-logo";
import { FooterProps } from "@/interfaces/footer-props";

export const Footer = ({ className, ...props }: FooterProps) => {
  return (
    <div
      {...props}
      className={cn(
        "flex text-xs justify-center items-center w-full py-2 border gap-x-4",
        className
      )}
    >
      <NavbarBrandLogo className="h-full" />
      <div className="font-bold flex gap-x-2">
        <span>©</span>
        <span> {new Date().getFullYear()} </span>
      </div>
    </div>
  );
};
