import { ComponentPropsWithoutRef } from "react";
import { User } from "@/interfaces/user";

interface UsersTableProps extends ComponentPropsWithoutRef<"div"> {
  data?: User[];
}

export type { UsersTableProps };
