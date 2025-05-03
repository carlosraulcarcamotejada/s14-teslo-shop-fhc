export const revalidate = 60;

import { getProductsPaginated } from "@/actions/product/get-products-paginated";
import { ProductsGrid } from "@/components/products/products-grid";
import { PaginationPage } from "@/components/shared/pagination-page";
import { TitlePage } from "@/components/shared/title-page";
import { CategoryOption } from "@/interfaces/category/category-option";
import { PageProps } from "@/interfaces/page/page-props";
import { notFound } from "next/navigation";

export default async function CategoryPage({
  params,
  searchParams,
}: PageProps) {
  const { id: category } = await params;

  const searchParamsData = await searchParams;

  const page = searchParamsData?.page
    ? parseInt(searchParamsData?.page ?? "1")
    : 1;

  const { products, totalPages } = await getProductsPaginated({
    page,
    category: category as CategoryOption,
  });

  if (products.length < 1) {
    return notFound();
  }

  return (
    <>
      <TitlePage title={category} subTitle="todos los productos" />
      <ProductsGrid className="mt-10" products={products} />
      <PaginationPage totalPages={totalPages} className="mt-20" />
    </>
  );
}
