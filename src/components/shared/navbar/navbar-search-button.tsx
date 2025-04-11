"use client";

import { Button } from "@/components/ui/button";
import { NavbarSearchButtonProps } from "@/interfaces/navbar-search-button-props";
import { cn } from "@/lib/utils";
import { SearchIcon } from "lucide-react";

export const NavbarSearchButton = ({
  className,
  ...rest
}: NavbarSearchButtonProps) => {
  return (
    <Button
      className={cn("", className)}
      onClick={() => {}}
      variant={"ghost"}
      {...rest}
    >
      <SearchIcon />
    </Button>
  );
};
