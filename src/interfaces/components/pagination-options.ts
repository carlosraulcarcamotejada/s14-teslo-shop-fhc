import { CategoryOption } from "@/interfaces/category/category-option";

interface PaginationOptions {
  page?: number;
  take?: number;
  category?: CategoryOption;
}

export type { PaginationOptions };
