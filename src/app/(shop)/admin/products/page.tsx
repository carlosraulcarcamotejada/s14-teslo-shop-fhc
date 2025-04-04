export const revalidate = 0;
import { getPaginatedProductsWithImages } from "@/actions/product/product-pagination";
import { OrdersTable } from "@/components/orders/orders-table";
import { ProductsTable } from "@/components/products/products-table";
import { PaginationPage } from "@/components/shared/pagination-page";
import { TitlePage } from "@/components/shared/title-page";
import { buttonVariants } from "@/components/ui/button";
import { PageProps } from "@/interfaces/page-props";
import { cn } from "@/lib/utils";
import { BoxIcon } from "lucide-react";
import Link from "next/link";

export default async function ProductsPage({ searchParams }: PageProps) {
  const searchParamsData = await searchParams;

  const page = searchParamsData?.page
    ? parseInt(searchParamsData?.page ?? "1")
    : 1;

  const { products, totalPages } = await getPaginatedProductsWithImages();

  return (
    <div className="col-start-1 col-span-full px-4">
      <TitlePage title={`Mantenimiento de productos:`} size="m" />
      <Link
        href={"/admin/product/new"}
        className={cn(buttonVariants({ variant: "default" }), "my-4")}
      >
        <BoxIcon />
        Nuevo Producto
      </Link>
      <ProductsTable data={products} totalPages={totalPages} />
    </div>
  );
}
