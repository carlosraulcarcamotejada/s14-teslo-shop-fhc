export const revalidate = 60;

import { getPaginatedProductsWithImages } from "@/actions/product/get-products-paginated";
import { ProductGrid } from "@/components/products/product-grid";
import { PaginationPage } from "@/components/shared/pagination-page";
import { TitlePage } from "@/components/shared/title-page";
import { PageProps } from "@/interfaces/page-props";
import { Category, Product } from "@/seed/seed";
import { redirect } from "next/navigation";

const categoryMap: Record<Category, string> = {
  men: "Para hombres",
  women: "Para mujeres",
  kid: "Para niños",
  unisex: "Para todos",
  "non-category": "",
};

export default async function CategoryPage({
  params,
  searchParams,
}: PageProps) {
  const { id: category } = await params;

  const searchParamsData = await searchParams;

  const page = searchParamsData?.page
    ? parseInt(searchParamsData?.page ?? "1")
    : 1;

  const { products, totalPages, categoriesMap } =
    await getPaginatedProductsWithImages({
      page,
      category: category as Category,
    });

  if (products.length === 0) {
    redirect(`/category/${category}`);
  }

  const filteredProducts: Product[] = products.filter(
    (product) => product.category === categoriesMap.get(category as Category)
  );

  const categoryLabel =
    (category as Category) in categoryMap
      ? categoryMap[category as Category]
      : "Desconocido";

  return (
    <div className="col-start-1 col-span-4 md:col-span-8 lg:col-span-12 px-4">
      <TitlePage title={categoryLabel} subTitle="todos los productos" />
      <ProductGrid className="mt-10" products={filteredProducts} />
      <PaginationPage totalPages={totalPages} className="mt-20" />
    </div>
  );
}
