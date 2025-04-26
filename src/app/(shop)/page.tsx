export const revalidate = 60;

import { getProductsPaginated } from "@/actions/product/get-products-paginated";
import { ProductGrid } from "@/components/products/product-grid";
import { PaginationPage } from "@/components/shared/pagination-page";
import { TitlePage } from "@/components/shared/title-page";
import { PageProps } from "@/interfaces/page/page-props";

export default async function ShopPage({ searchParams }: PageProps) {
  const searchParamsData = await searchParams;

  const page = searchParamsData?.page
    ? parseInt(searchParamsData?.page ?? "1")
    : 1;

  const { products, totalPages } = await getProductsPaginated({
    page,
  });

  return (
    <div className="col-start-1 col-span-4 md:col-span-8 lg:col-span-12 px-4">
      <TitlePage title="Tienda" subTitle="Todos los productos" />
      <ProductGrid className="mt-10" products={products} />
      {products.length > 0 && (
        <PaginationPage totalPages={totalPages} className="mt-20" />
      )}
    </div>
  );
}
