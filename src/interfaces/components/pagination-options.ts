import { Category } from "@/interfaces/shared/category";

interface PaginationOptions {
  page?: number;
  take?: number;
  category?: Category;
}

export type { PaginationOptions };
