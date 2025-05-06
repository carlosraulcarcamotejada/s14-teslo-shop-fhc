"use client";
import { useState } from "react";
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
import { RefreshCcwIcon, SaveIcon, XIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { ProductFormProps } from "@/interfaces/product/product-form-props";
import { Textarea } from "@/components/ui/textarea";
import { productFormSchema } from "@/schema/product-form-schema";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { productDefaultValues } from "@/data/product-default-values";
import { productSizes } from "@/seed/seed";
import { createProduct } from "@/actions/product/create-product";
import { ProductFormValues } from "@/interfaces/product/product-form-values";
import { updateProduct } from "@/actions/product/update-product";
import { useRouter } from "next/navigation";
import { Product } from "@/interfaces/product/product";
import { Link } from "@/components/ui/link";
import { ProductDeleteImageCard } from "@/components/product/product-delete-image-card";
import { toast } from "sonner";

export const ProductForm = ({
  categories = [],
  className,
  product,
  types = [],
  ...props
}: ProductFormProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
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
    setIsLoading(true);
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

    // console.log(imagesFile);
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
    setIsLoading(false);
    if (ok && product) router.replace(`/admin/product/${product?.slug}`);

    toast(message, {
      action: {
        label: <XIcon className="w-4 h-4" />,
        onClick: () => {
          toast.dismiss();
        },
      },
    });
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
                    <Input
                      placeholder="Título"
                      {...field}
                      disabled={isLoading}
                    />
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
                      disabled={isLoading}
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
              render={({ field: { ref, name } }) => (
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
                      disabled={isLoading}
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
              <div className="flex flex-wrap gap-4">
                {productImage?.map(({ id, url }) => (
                  <ProductDeleteImageCard
                    key={id}
                    url={url}
                    id={id}
                    isDisabled={isLoading}
                  />
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
                    <Input placeholder="Slug" {...field} disabled={isLoading} />
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
                    <Textarea
                      placeholder="Descripción"
                      {...field}
                      disabled={isLoading}
                    />
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
                      disabled={isLoading}
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
                    <Input placeholder="Tags" {...field} disabled={isLoading} />
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
                      disabled={isLoading}
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
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      disabled={isLoading}
                    >
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
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      disabled={isLoading}
                    >
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
              disabled={isLoading || !form.formState.isDirty}
            >
              {productValues?.id ? (
                <RefreshCcwIcon className={cn(isLoading && "animate-spin")} />
              ) : (
                <SaveIcon className={cn(isLoading && "animate-pulse")} />
              )}
              {productValues?.id ? "Actualizar" : "Guardar"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
