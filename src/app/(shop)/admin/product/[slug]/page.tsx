import { getCategories } from "@/actions/category/get-categories";
import { getProductBySlug } from "@/actions/product/get-product-by-slug";
import { getTypes } from "@/actions/types/get-types";
import { PageContainer } from "@/components/page/page-container";
import { ProductForm } from "@/components/products/product-form";
import { TitlePage } from "@/components/shared/title-page";
import { PageProps } from "@/interfaces/page/page-props";
import { notFound } from "next/navigation";

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;

  const [{ product }, { categories }, { types }] = await Promise.all([
    getProductBySlug({ slug, showProductImage: true }),
    getCategories(),
    getTypes(),
  ]);

  if (!product) notFound();

  const title: string =
    product?.title === "new" ? "Nuevo producto" : "Editar producto";

  return (
    <PageContainer>
      <TitlePage title={title} />
      <ProductForm product={product} categories={categories} types={types} />
    </PageContainer>
  );
}
