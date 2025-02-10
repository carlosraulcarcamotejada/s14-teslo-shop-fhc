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
    <>
      {/* Slideshow */}
      <div className="col-start-1 col-span-4 md:col-span-4 lg:col-span-8">
        <ProductSlideshow
          aria-label="Galería de imágenes"
          images={images}
          title={title}
        />
      </div>

      {/* Details */}
      <div className="flex flex-col mt-10 px-4 md:mt-0 md:mx-4 col-span-4 sm:col-start-1 md:col-start-5 md:col-span-4 lg:col-start-9 lg:col-span-5">
        <h1 className={`${titleFont.className} antialiased font-bold text-2xl`}>
          {title}
        </h1>
        <div className="text-lg mt-4">{`$${price.toFixed(2)}`}</div>

        {sizes && sizes.length > 0 && (
          <SizeSelector
            className="mt-4"
            availableSizes={sizes}
            selectedSize={sizes[0]}
          />
        )}

        {/* Quantity */}
        <QuantitySelector title="Cantidad" className="mt-4" />

        {/* Add To Cart Button */}
        <Button variant="default" size="lg" className="select-none mt-8">
          Agregar al carrrito
          <ShoppingCartIcon />
        </Button>

        <h3 className="font-bold text-sm mt-12">Descripción:</h3>
        <p className="font-light text-justify mt-2">{description}</p>
      </div>
    </>
  );
}
