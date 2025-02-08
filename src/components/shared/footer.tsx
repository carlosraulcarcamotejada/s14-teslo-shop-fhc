import Link from "next/link";
import { cn } from "@/lib/utils";
import { NavbarLogo } from "@/components/shared/top-bar";
import { ClassValue } from "clsx";

interface FooterProps {
  className?: ClassValue;
}

export const Footer = ({ className }: FooterProps) => {
  return (
    <div
      className={cn(
        "flex text-xs justify-center items-center w-full h-10 py-2 border gap-x-4",
        className
      )}
    >
      <NavbarLogo />
      <div className="font-bold flex gap-x-2">
        <span>©</span>
        <span> {new Date().getFullYear()} </span>
      </div>
    </div>
  );
};
