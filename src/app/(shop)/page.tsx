import { ProductGrid } from "@/components/products/product-grid";
import { Title } from "@/components/shared/title";
import { initialData } from "@/seed/seed";

const products = initialData.products;

export default function ShopPage() {
  return (
    <div className="flex flex-col gap-y-10 pb-40">
      <Title title="Tienda" subTitle="todos los productos" />
      <ProductGrid products={products} />
    </div>
  );
}
