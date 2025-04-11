import { ComponentPropsWithoutRef } from "react";
import { User } from "@/interfaces/user/user";

interface UsersTableProps extends ComponentPropsWithoutRef<"div"> {
  data?: User[];
  totalPages?: number;
}

export type { UsersTableProps };
