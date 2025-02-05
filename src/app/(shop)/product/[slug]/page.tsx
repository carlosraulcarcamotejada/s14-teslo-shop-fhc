import { notFound } from "next/navigation";
import { initialData, Product } from "@/seed/seed";
import { titleFont } from "@/config/fonts";
import { Button } from "@/components/ui/button";
import { SizeSelector } from "@/components/product/size-selector";
import { QuantitySelector } from "@/components/product/quantity-selector";
import { ShoppingCartIcon } from "lucide-react";
import { ProductSlideshow } from "@/components/product/product-slideshow";

interface ProductPageProps {
  params: {
    slug: string;
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;

  const product: Product | undefined = initialData.products.find(
    (product) => product.slug === slug
  );

  if (!product) notFound();

  const { description, title, price, sizes, images } = product;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 gap-y-10 my-6 mb-40">
      {/* Slideshow */}
      <div className="col-span-1 md:col-span-2">
        <ProductSlideshow
          className="bg-red-500@"
          images={images}
          title={title}
        />
      </div>

      {/* Details */}
      <div className="col-span-1 md:col-span-1 flex flex-col gap-y-6@ mx-6">
        <h1 className={`${titleFont.className} antialiased font-bold text-2xl`}>
          {title}
        </h1>
        <div className="text-lg mt-4">{`$ ${price.toFixed(2)}`}</div>

        {sizes && sizes.length > 0 && (
          <SizeSelector className="mt-4" availableSizes={sizes} selectedSize={sizes[0]} />
        )}

        {/* Quantity */}
        <QuantitySelector title="Cantidad" className="mt-4" />

        {/* Add To Cart Button */}
        <Button variant="default" size="lg" className="select-none mt-4">
          Agregar al carrrito
          <ShoppingCartIcon />
        </Button>
        

        <h3 className="font-bold text-sm mt-4">Descripción:</h3>
        <p className="font-light text-justify mt-2">{description}</p>
      </div>
    </div>
  );
}
