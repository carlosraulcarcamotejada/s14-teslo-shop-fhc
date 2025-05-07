import { CategoryOption } from "@/interfaces/category/category-option";

interface PaginationArgs {
  page?: number;
  take?: number;
  category?: CategoryOption;
}

export type { PaginationArgs };
