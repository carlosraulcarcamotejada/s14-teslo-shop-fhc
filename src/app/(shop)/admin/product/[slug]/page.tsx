import { getCategories } from "@/actions/category/get-categories";
import { getProductBySlug } from "@/actions/product/get-product-by-slug";
import { PageContainer } from "@/components/page/page-container";
import { ProductForm } from "@/components/products/product-form";
import { TitlePage } from "@/components/shared/title-page";
import { notFound } from "next/navigation";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const [{ product }, { categories }] = await Promise.all([
    getProductBySlug({ slug, showProductImage: true }),
    getCategories(),
  ]);

  if (!product) notFound();

  const title: string =
    product?.title === "new" ? "Nuevo producto" : "Editar producto";

  return (
    <PageContainer>
      <TitlePage title={title} />
      <ProductForm product={product} categories={categories} />
    </PageContainer>
  );
}
