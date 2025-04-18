export const revalidate = 0;
import Link from "next/link";
import { getProductsPaginated } from "@/actions/product/get-products-paginated";
import { ProductsTable } from "@/components/products/products-table";
import { TitlePage } from "@/components/shared/title-page";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { BoxIcon } from "lucide-react";

export default async function ProductsPage() {
  const { products, totalPages } = await getProductsPaginated();

  return (
    <div className="col-start-1 col-span-full px-4">
      <TitlePage title={`Mantenimiento de productos:`} size="m" />
      <Link
        href={"/admin/product/new"}
        className={cn(buttonVariants({ variant: "default" }), "my-4")}
      >
        Nuevo Producto
        <BoxIcon />
      </Link>
      <ProductsTable data={products} totalPages={totalPages} />
    </div>
  );
}
