export const revalidate = 0;
import Link from "next/link";
import { getProductsPaginated } from "@/actions/product/get-products-paginated";
import { ProductsTable } from "@/components/products/products-table";
import { TitlePage } from "@/components/shared/title-page";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { BoxIcon } from "lucide-react";
import { PageProps } from "@/interfaces/page/page-props";

export default async function ProductsPage({ searchParams }: PageProps) {
  const searchParamsData = await searchParams;

  const page = searchParamsData?.page
    ? parseInt(searchParamsData?.page ?? "1")
    : 1;

  const take: number = 10;

  const { products, totalPages } = await getProductsPaginated({ page, take });

  return (
    <>
      <TitlePage title={`Mantenimiento de productos:`} size="m" />
      <Link
        href={"/admin/product/new"}
        className={cn(buttonVariants({ variant: "default" }), "my-4")}
      >
        <BoxIcon />
        Nuevo Producto
      </Link>
      <ProductsTable
        data={products}
        totalPages={totalPages}
        pagination={{ pageSize: take, pageIndex: 0 }}
      />
    </>
  );
}
