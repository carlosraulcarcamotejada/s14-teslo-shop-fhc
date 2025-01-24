"use client";
import { useState } from "react";


export const TopBarMenuToggle = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div
      aria-label={isMenuOpen ? "Close menu" : "Open menu"}
      className="sm:hidden"
    />
  );
};
