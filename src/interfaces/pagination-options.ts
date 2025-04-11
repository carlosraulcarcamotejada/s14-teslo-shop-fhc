import { Category } from "@/interfaces/category";

interface PaginationOptions {
  page?: number;
  take?: number;
  category?: Category;
}

export type { PaginationOptions };
