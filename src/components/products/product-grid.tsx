import { Product } from "@/seed/seed";
import { ProductGridItem } from "@/components/products/product-grid-item";

interface ProductGridProps {
  products: Product[];
}

const ProductGrid = ({ products }: ProductGridProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-10">
      {products.map((product) => (
        <ProductGridItem {...product} />
      ))}
    </div>
  );
};

export { ProductGrid };
