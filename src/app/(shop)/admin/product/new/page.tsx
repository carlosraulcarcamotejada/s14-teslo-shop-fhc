import { getCategories } from "@/actions/category/get-categories";
import { getTypes } from "@/actions/types/get-types";
import { ProductForm } from "@/components/product/product-form";
import { TitlePage } from "@/components/shared/title-page";

export default async function NewProductPage() {
  const [{ categories }, { types }] = await Promise.all([
    getCategories(),
    getTypes(),
  ]);

  return (
    <>
      <TitlePage title={"Nuevo producto"} />
      <ProductForm className="mt-10" categories={categories} types={types} />
    </>
  );
}
