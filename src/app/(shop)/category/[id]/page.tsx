import { ProductGrid } from "@/components/products/product-grid";
import { Title } from "@/components/shared/title";
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
    <div className="flex flex-col gap-y-10 pb-40 px-4 py-6">
      <Title title={categoryLabel} subTitle="todos los productos" />
      <ProductGrid products={filteredProducts} />
    </div>
  );
}
