import { getCategories } from "@/actions/category/get-categories";
import { getProduct } from "@/actions/product/get-product";
import { getTypes } from "@/actions/types/get-types";
import { ProductForm } from "@/components/products/product-form";
import { TitlePage } from "@/components/shared/title-page";
import { PageProps } from "@/interfaces/page/page-props";
import { notFound } from "next/navigation";

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;

  const [{ product }, { categories }, { types }] = await Promise.all([
    getProduct({ slug, showProductImage: true }),
    getCategories(),
    getTypes(),
  ]);

  if (!product) notFound();

  return (
    <>
      <TitlePage title={"Editar producto"} />
      <ProductForm
        categories={categories}
        className="mt-10"
        product={product}
        types={types}
      />
    </>
  );
}
