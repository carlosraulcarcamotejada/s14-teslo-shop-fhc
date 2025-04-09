export const revalidate = 60;

import { getProductsPaginated } from "@/actions/product/get-products-paginated";
import { PageContainer } from "@/components/page/page-container";
import { ProductGrid } from "@/components/products/product-grid";
import { NotFoundElement } from "@/components/shared/not-found-element";
import { PaginationPage } from "@/components/shared/pagination-page";
import { TitlePage } from "@/components/shared/title-page";
import { PageProps } from "@/interfaces/page-props";
import { Category, Product } from "@/seed/seed";

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
    category: category as Category,
  });

  const filteredProducts: Product[] = products.filter(
    (product) => product.category === categoriesMap.get(category as Category)
  );

  if (!categoriesMap.has(category as Category)) {
    return (
      <PageContainer>
        <NotFoundElement
          title="La categoría no existe"
          subTitle="Lo sentimos, no pudimos encontrar la categoría que estás buscando."
        />
      </PageContainer>
    );
  }

  return (
    <div className="col-start-1 col-span-4 md:col-span-8 lg:col-span-12 px-4">
      <TitlePage title={category} subTitle="todos los productos" />
      <ProductGrid className="mt-10" products={filteredProducts} />
      <PaginationPage totalPages={totalPages} className="mt-20" />
    </div>
  );
}
