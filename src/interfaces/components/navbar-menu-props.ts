import { Session } from "next-auth";

interface NavbarMenuProps {
  session: Session | null;
}

export type { NavbarMenuProps };
