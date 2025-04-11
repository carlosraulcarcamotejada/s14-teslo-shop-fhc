import { ComponentPropsWithoutRef } from "react";

interface PaginationPageProps extends ComponentPropsWithoutRef<"nav"> {
  totalPages: number;
}

export type { PaginationPageProps };
