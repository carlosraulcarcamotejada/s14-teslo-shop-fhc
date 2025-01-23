"use client";
import { useState } from "react";
import { NavbarMenuToggle } from "@heroui/react";

export const TopBarMenuToggle = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <NavbarMenuToggle
      aria-label={isMenuOpen ? "Close menu" : "Open menu"}
      className="sm:hidden"
    />
  );
};
