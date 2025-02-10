import { ProductGrid } from "@/components/products/product-grid";
import { TitlePage } from "@/components/shared/title-page";
import { PageProps } from "@/interfaces/page/page-props";
import { Category, initialData, Product } from "@/seed/seed";

const products = initialData.products;

const categoryMap: Record<Category, string> = {
  men: "Para hombres",
  women: "Para mujeres",
  kid: "Para niños",
  unisex: "Para todos",
};

export default async function CategoryPage({ params }: PageProps) {
  const { id } = await params;

  const filteredProducts: Product[] = products.filter(
    (product) => product.gender === id
  );

  const categoryLabel =
    (id as Category) in categoryMap
      ? categoryMap[id as Category]
      : "Desconocido";

  return (
    <div className="col-start-1 col-span-4 md:col-span-8 lg:col-span-12 px-4">
      <TitlePage title={categoryLabel} subTitle="todos los productos" />
      <ProductGrid className="mt-10" products={filteredProducts} />
    </div>
  );
}
