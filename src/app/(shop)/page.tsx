export const revalidate = 60;

import { getPaginatedProductsWithImages } from "@/actions/product/product-pagination";
import { ProductGrid } from "@/components/products/product-grid";
import { PaginationPage } from "@/components/shared/paginationPage";
import { TitlePage } from "@/components/shared/title-page";
import { PageProps } from "@/interfaces/page/page-props";
import { redirect } from "next/navigation";

export default async function ShopPage({ searchParams }: PageProps) {
  const searchParamsData = await searchParams;

  const page = searchParamsData?.page
    ? parseInt(searchParamsData?.page ?? "1")
    : 1;

  const { products, totalPages } = await getPaginatedProductsWithImages({
    page,
  });

  if (products.length === 0) {
    redirect("/");
  }

  return (
    <div className="col-start-1 col-span-4 md:col-span-8 lg:col-span-12 px-4">
      <TitlePage title="Tienda" subTitle="Todos los productos" />
      <ProductGrid className="mt-10" products={products} />
      <PaginationPage totalPages={totalPages} className="mt-20" />
    </div>
  );
}
