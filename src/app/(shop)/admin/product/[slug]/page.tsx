import { getCategories } from "@/actions/product/get-categories";
import { getProductBySlug } from "@/actions/product/get-product-by-slug";
import { PageContainer } from "@/components/page/page-container";
import { ProductForm } from "@/components/products/product-form";
import { TitlePage } from "@/components/shared/title-page";
import { PageProps } from "@/interfaces/page-props";
import { redirect } from "next/navigation";

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;

  const product = await getProductBySlug(slug);

  if (!product) redirect("/admin/products");

  const title: string =
    product?.title === "new" ? "Nuevo producto" : "Editar producto";

  const { categories } = await getCategories();

  return (
    <PageContainer>
      <TitlePage title={title} />
      <ProductForm product={product} categories={categories} />
    </PageContainer>
  );
}
