"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { RefreshCcwIcon, SaveIcon, Trash2Icon } from "lucide-react";
import { cn } from "@/lib/utils";
import { ProductFormProps } from "@/interfaces/product/product-form-props";
import { Textarea } from "@/components/ui/textarea";
import { productFormSchema } from "@/schema/product-form-schema";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { productDefaultValues } from "@/data/product-default-values";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { productSizes } from "@/seed/seed";
import { createProduct } from "@/actions/product/create-product";
import { ProductFormValues } from "@/interfaces/product/product-form-values";
import { updateProduct } from "@/actions/product/update-product";
import { useRouter } from "next/navigation";
import { Product } from "@/interfaces/product/product";
import { Link } from "@/components/ui/link";
import { ProductImage } from "@/components/product/product-image";

export const ProductForm = ({
  categories = [],
  className,
  product,
  types = [],
  ...props
}: ProductFormProps) => {
  const router = useRouter();

  // 1. Define your default values.
  const productValues: ProductFormValues = product
    ? product
    : productDefaultValues;

  // useEffect(() => {
  //   console.log(productValues);
  // }, [productValues]);

  // 2. Define your form.
  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema),
    defaultValues: productValues,
  });

  // 3. Define a submit handler.
  async function onSubmit(values: ProductFormValues) {
    const { imagesFile, ...restProductToSave } = values;
    const productFormData = new FormData();

    productFormData.append("categoryId", restProductToSave.categoryId);
    productFormData.append("description", restProductToSave.description);
    if (productValues?.id) productFormData.append("id", productValues?.id);
    productFormData.append(
      "inStock",
      (restProductToSave?.inStock ?? 0).toString()
    );
    productFormData.append("price", (restProductToSave?.price ?? 0).toString());
    productFormData.append("sizes", restProductToSave.sizes.toString());
    productFormData.append("slug", restProductToSave.slug);
    productFormData.append("tags", restProductToSave.tags.toString());
    productFormData.append("title", restProductToSave.title);
    productFormData.append("typeId", restProductToSave.typeId);

    console.log(imagesFile);
    if (imagesFile) {
      for (let index = 0; index < imagesFile.length; index++) {
        productFormData.append("imagesFile", imagesFile[index]);
      }
    }

    let ok: boolean;
    let message: string | undefined;
    let product: Product | undefined;

    if (values.id) {
      const {
        ok: okResp,
        message: messageResp,
        updatedProduct: updatedProductResp,
      } = await updateProduct({
        productFormData,
      });
      ok = okResp;
      message = messageResp;
      product = updatedProductResp;
    } else {
      const {
        ok: okResp,
        message: messageResp,
        createdProduct,
      } = await createProduct({
        productFormData,
      });
      ok = okResp;
      message = messageResp;
      product = createdProduct;
    }

    console.log(message, product, ok);
    if (!ok || !product) return;
    router.replace(`/admin/product/${product?.slug}`);
  }

  const { productImage } = productValues;

  return (
    <div className={cn("", className)} {...props}>
      <Link href={`/product/${productValues.slug}`}>{productValues.title}</Link>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 gap-2 sm:gap-5 sm:grid-cols-2 mt-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Título</FormLabel>
                  <FormControl>
                    <Input placeholder="Título" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="sizes"
              render={({ field: { onChange, value } }) => (
                <FormItem>
                  <FormLabel>Tallas</FormLabel>
                  <FormControl>
                    <ToggleGroup
                      className="flex flex-wrap justify-start items-center"
                      type="multiple"
                      onValueChange={onChange}
                      value={value}
                    >
                      {productSizes.map((size: string, index: number) => (
                        <ToggleGroupItem
                          variant={"outline"}
                          size="md"
                          key={size + index}
                          value={size}
                        >
                          {size}
                        </ToggleGroupItem>
                      ))}
                    </ToggleGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="imagesFile"
              render={({ field: { onChange, ref, name } }) => (
                <FormItem>
                  <FormLabel>Fotos</FormLabel>
                  <FormControl>
                    <Input
                      accept="image/png, image/jpeg, image/avif"
                      multiple
                      name={name}
                      placeholder="Fotos"
                      ref={ref}
                      type="file"
                      onChange={(e) => {
                        const files = Array.from(e.target.files ?? []);
                        form.setValue("imagesFile", files);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex flex-col">
              <span className="mb-5 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Imágenes
              </span>
              <div className="flex gap-4">
                {productImage?.map(({ id, url }) => (
                  <Card className={"w-max"} key={id}>
                    <CardContent className="p-0 overflow-hidden">
                      <ProductImage
                        className="size-40 rounded-t-md"
                        src={url}
                        alt={url}
                        width={500}
                        height={500}
                      />
                    </CardContent>
                    <CardFooter className="flex justify-center p-0">
                      <Button
                        className="w-full rounded-b-md rounded-t-none"
                        type="button"
                        variant={"destructive"}
                        onClick={() => {}}
                      >
                        <Trash2Icon />
                        Eliminar
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>

            <FormField
              control={form.control}
              name="slug"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Slug</FormLabel>
                  <FormControl>
                    <Input placeholder="Slug" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descripción</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Descripción" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="price"
              render={({ field: { value = "", ...restField } }) => (
                <FormItem>
                  <FormLabel>Precio</FormLabel>
                  <FormControl>
                    <Input
                      {...restField}
                      placeholder="Precio"
                      type="number"
                      value={value}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tags</FormLabel>
                  <FormControl>
                    <Input placeholder="Tags" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="inStock"
              render={({ field: { value = "", ...restField } }) => (
                <FormItem>
                  <FormLabel>inStock</FormLabel>
                  <FormControl>
                    <Input
                      {...restField}
                      placeholder="inStock"
                      type="number"
                      value={value}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Categoría</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccione una categoría" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Categoría</SelectLabel>
                          {categories.map(({ id, name }) => (
                            <SelectItem key={id} value={id}>
                              {name}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            <FormField
              control={form.control}
              name="typeId"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Tipo</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccione un tipo" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Tipo</SelectLabel>
                          {types.map(({ id, name }) => (
                            <SelectItem key={id} value={id}>
                              {name}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
          </div>
          <div className="w-full flex justify-center mt-20">
            <Button
              className={cn(
                buttonVariants({ variant: "default" }),
                "w-full lg:w-1/3"
              )}
              type="submit"
              // disabled={}
            >
              {productValues?.id ? <RefreshCcwIcon /> : <SaveIcon />}
              {productValues?.id ? "Actualizar" : "Guardar"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
