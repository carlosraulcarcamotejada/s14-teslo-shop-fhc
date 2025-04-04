"use client";
import {
  Pagination as PaginationSCN,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { redirect, usePathname, useSearchParams } from "next/navigation";
import { generatePaginationNumbers } from "@/utils/generatePaginationNumbers";
import { PaginationPageProps } from "@/interfaces/pagination-page-props";

export const PaginationPage = ({
  totalPages,
  className,
  ...props
}: PaginationPageProps) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const page: string | number = searchParams.get("page") ?? 1;
  const currentPage: number = isNaN(+page) ? 1 : +page;

  if (currentPage < 1 || isNaN(+page)) {
    redirect(pathname);
  }

  const allPages = generatePaginationNumbers(currentPage, totalPages);

  const createPageUrl = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);

    if (pageNumber === "...") {
      return `${pathname}?${params.toString()}`;
    }

    if (+pageNumber <= 0) {
      return `${pathname}`;
    }

    if (+pageNumber > totalPages) {
      return `${pathname}?${params.toString()}`;
    }

    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  return (
    <PaginationSCN className={className} {...props}>
      <PaginationContent>
        <PaginationItem disabled={currentPage === 1}>
          <PaginationPrevious
            href={createPageUrl(currentPage - 1)}
            label="Anterior"
          />
        </PaginationItem>

        {allPages.map((itemPage, index) => (
          <PaginationItem key={itemPage + "-" + index}>
            {itemPage === "..." ? (
              <PaginationEllipsis />
            ) : (
              <PaginationLink
                href={createPageUrl(itemPage)}
                isActive={itemPage === currentPage}
              >
                {itemPage}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}

        <PaginationItem disabled={currentPage === totalPages || totalPages === 0}>
          <PaginationNext
            href={createPageUrl(currentPage + 1)}
            label="Siguiente"
          />
        </PaginationItem>
      </PaginationContent>
    </PaginationSCN>
  );
};
