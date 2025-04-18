export const revalidate = 60;

import { getProductsPaginated } from "@/actions/product/get-products-paginated";
import { ProductGrid } from "@/components/products/product-grid";
import { PaginationPage } from "@/components/shared/pagination-page";
import { TitlePage } from "@/components/shared/title-page";
import { CategoryOption } from "@/interfaces/category/category-option";
import { PageProps } from "@/interfaces/page/page-props";
import { Product } from "@/interfaces/product/product";
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

  const { products, totalPages, categoriesMap } = await getProductsPaginated({
    page,
    category: category as CategoryOption,
  });

  const filteredProducts: Product[] = products.filter(
    (product) => product.category === categoriesMap.get(category as CategoryOption)
  );

  if (!categoriesMap.has(category as CategoryOption)) {
    return notFound();
  }

  return (
    <div className="col-start-1 col-span-4 md:col-span-8 lg:col-span-12 px-4">
      <TitlePage title={category} subTitle="todos los productos" />
      <ProductGrid className="mt-10" products={filteredProducts} />
      <PaginationPage totalPages={totalPages} className="mt-20" />
    </div>
  );
}
