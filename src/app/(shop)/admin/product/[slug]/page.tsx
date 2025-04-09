import { getProductBySlug } from "@/actions/product/get-product-by-slug";
import { ProductForm } from "@/components/products/product-form";
import { TitlePage } from "@/components/shared/title-page";
import { PageProps } from "@/interfaces/page-props";
import { redirect } from "next/navigation";

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;

  const product = await getProductBySlug(slug);

  !product && redirect("/admin/products");

  const title: string =
    product?.title === "new" ? "Nuevo producto" : "Editar producto";

  return (
    <div className="col-start-1 col-span-4 md:col-span-8 lg:col-span-12 px-4">
      <TitlePage title={title} />
      <ProductForm />
    </div>
  );
}
