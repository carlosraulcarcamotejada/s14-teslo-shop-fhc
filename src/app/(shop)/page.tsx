import { ProductGrid } from "@/components/products/product-grid";
import { TitlePage } from "@/components/shared/title-page";
import { initialData } from "@/seed/seed";

const products = initialData.products;

export default function ShopPage() {
  return (
    <div className="flex flex-col gap-y-10 pb-40 px-4 py-6">
      <TitlePage title="Tienda" subTitle="todos los productos" />
      <ProductGrid products={products} />
    </div>
  );
}
