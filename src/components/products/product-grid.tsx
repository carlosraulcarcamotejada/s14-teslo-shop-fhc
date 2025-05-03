import { ProductGridProps } from "@/interfaces/product/product-grid-props";
import { ProductCard } from "@/components/products/product-card";
import { cn } from "@/lib/utils";

const ProductGrid = ({ className, products, ...props }: ProductGridProps) => {
  return (
    <div
      {...props}
      className={cn(
        `
        grid 
        grid-cols-1 
        gap-x-2
        gap-y-4

        sm:grid-cols-2
        sm:gap-x-3
        sm:gap-y-3
 

        md:grid-cols-3 
        md:gap-x-4
        md:gap-y-4 

        lg:grid-cols-4 
        lg:gap-x-5
        lg:gap-y-5

        2xl:grid-cols-5
        2xl:gap-x-6
        2xl:gap-y-6`,
        className
      )}
    >
      {products.map((product) => (
        <ProductCard key={product.slug} product={product} />
      ))}
    </div>
  );
};

export { ProductGrid };
