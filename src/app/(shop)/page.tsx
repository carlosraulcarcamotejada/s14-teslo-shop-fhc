import { ProductGrid } from "@/components/products/product-grid";
import { TitlePage } from "@/components/shared/title-page";
import { initialData } from "@/seed/seed";

const products = initialData.products;

export default function ShopPage() {
  return (
    <div className="col-start-1 col-span-4 md:col-span-8 lg:col-span-12 px-4">
      <TitlePage title="Tienda" subTitle="todos los productos" />
      <ProductGrid className="mt-10" products={products} />
    </div>
  );
}
