import { Category } from "@/seed/seed";

interface PaginationOptions {
  page?: number;
  take?: number;
  category?: Category;
}

export type { PaginationOptions };
