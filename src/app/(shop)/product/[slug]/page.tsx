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
    <div className="grid lg:grid-cols-10 pb-40 px-4 py-6">
      {/* Slideshow */}
      <div className="col-start-1 col-span-5">
        <ProductSlideshow images={images} title={title} />
      </div>

      {/* Details */}
      <div className="col-start-7 col-span-5 flex flex-col gap-y-6@ mx-6">
        <h1 className={`${titleFont.className} antialiased font-bold text-2xl`}>
          {title}
        </h1>
        <div className="text-lg mt-4">{`$ ${price.toFixed(2)}`}</div>

        {sizes && sizes.length > 0 && (
          <SizeSelector
            aria-label="Galería de imágenes"
            className="mt-4"
            availableSizes={sizes}
            selectedSize={sizes[0]}
          />
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
