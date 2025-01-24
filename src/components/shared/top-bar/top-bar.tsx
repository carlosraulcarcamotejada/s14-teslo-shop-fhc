import { SearchIcon, ShoppingCart } from "lucide-react";
import { TopBarMenu } from "./components/top-bar-menu";
import { TopBarMenuToggle } from "@/components/shared/top-bar/components/top-bar-menu-toggle";
import { TopBarMenuTabs } from "@/components/shared/top-bar/components/top-bar-menu-tabs";
import Link from "next/link";
import { AcmeLogo } from "@/components/icons/acme-logo";

export const TopBar = () => {
  return (
    <div>
      {/* Start Section (Brand) */}
      <div>
        <Link
          className="cursor-pointer flex items-center gap-x-4 sm:gap-x-0"
          href="/"
        >
          <TopBarMenuToggle />
          <AcmeLogo />
          <p className="font-bold text-inherit">Teslo</p>
        </Link>
      </div>
      {/* Center Section */}
      <div className="hidden sm:flex gap-4" >
        <TopBarMenuTabs />
      </div>
      {/* End Section */}
      <div >
        <div className="hidden lg:flex">
          <Link  href="/search">
            <SearchIcon className="size-4" />
          </Link>
        </div>
        <div className="hidden lg:flex">
          <div color="primary" content="5">
            <Link href="/cart">
              <ShoppingCart className="size-4" />
            </Link>
          </div>
        </div>
        <div>
          <div color="secondary" >
            Menu
          </div>
        </div>
      </div>
      {/* Menu For Mobile  */}
      <TopBarMenu />
    </div>
  );
};
