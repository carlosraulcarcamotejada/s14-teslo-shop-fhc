import Link from "next/link";
import { AcmeLogo } from "@/components/icon/acme-logo";
import { Separator } from "@/components/ui/separator";
import { titleFont } from "@/config/fonts";
import { cn } from "@/lib/utils";
import { NavbarLogoProps } from "@/interfaces/navbar-logo-props";

export const NavbarBrandLogo = ({ className, ...props }: NavbarLogoProps) => {
  return (
    <Link
      {...props}
      href="/"
      className={cn("flex items-center h-full space-x-2", className)}
    >
      <AcmeLogo className="size-10" />
      <Separator orientation="vertical" />
      <p
        className={`${titleFont.className} antialiased font-bold text-inherit`}
      >
        Teslo shop
      </p>
    </Link>
  );
};
