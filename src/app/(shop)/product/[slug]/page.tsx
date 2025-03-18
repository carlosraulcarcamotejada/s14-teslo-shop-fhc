export const revalidate = 604800; // 7 días

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Product } from "@/seed/seed";
import { titleFont } from "@/config/fonts";
import { ProductSlideshow } from "@/components/product/product-slideshow";
import { PageProps } from "@/interfaces/page-props";
import { getProductBySlug } from "@/actions/product/get-product-by-slug";
import { StockLabel } from "@/components/product/stock-label";
import { AddToCart } from "@/components/product/add-to-cart";
import { FormatNumber } from "@/utils/format-number";
import { getStockById } from "@/actions/product/get-stock-by-id";

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  // read route params
  const slug = (await params).slug;

  // fetch data
  const product = await getProductBySlug(slug);

  // optionally access and extend (rather than replace) parent metadata
  // const previousImages = (await parent).openGraph?.images || [];

  return {
    title: product?.title ?? "Producto no encontrado.",
    description: product?.description ?? "",
    openGraph: {
      title: product?.title ?? "Producto no encontrado.",
      description: product?.description ?? "",
      images: [`/products/${product?.images[1]}`],
    },
  };
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;

  const product: Product | null = await getProductBySlug(slug);

  if (!product) notFound();

  const { description, title, price, images, id } = product;

  const inStock: number | undefined = await getStockById(id);

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
        {/* Title */}
        <h1 className={`${titleFont.className} antialiased font-bold text-2xl`}>
          {title}
        </h1>
        {/* Stock */}
        <StockLabel inStock={inStock} />
        <div className="text-lg mt-4">{FormatNumber(price)}</div>

        <AddToCart product={product} />

        {/* Desccription */}
        <h3 className="font-bold text-sm mt-12">Descripción:</h3>
        <p className="font-light text-justify mt-2">{description}</p>
      </div>
    </>
  );
}
