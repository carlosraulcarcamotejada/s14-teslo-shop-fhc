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
import { SaveIcon, Trash2Icon } from "lucide-react";
import { cn } from "@/lib/utils";
import { ProductFormProps } from "@/interfaces/product/product-form-props";
import { Textarea } from "@/components/ui/textarea";
import { productFormSchema } from "@/schema/product-form-schema";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Product } from "@/interfaces/product/product";
import { useEffect } from "react";
import { productDefaultValues } from "@/data/product-default-values";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Image from "next/image";
import { ProductImage } from "@/interfaces/product/product-image";
import { productSizes } from "@/seed/seed";

export const ProductForm = ({
  categories,
  className,
  product,
  ...props
}: ProductFormProps) => {
  useEffect(() => {
    console.log(product);
  }, []);

  // 1. Define your default values.
  const defaultValues: Product & { productImage?: ProductImage[] } = product
    ? product
    : productDefaultValues;

  // 2. Define your form.
  const form = useForm<Product & { productImage?: ProductImage[] }>({
    resolver: zodResolver(productFormSchema),
    defaultValues,
  });

  // 3. Define a submit handler.
  async function onSubmit(values: Product) {
    console.log(values);

    if (values.id) {
    } else {
    }
  }

  const isValid: boolean = form.formState.isValid;

  const { productImage } = product;

  return (
    <div className={cn("", className)} {...props}>
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
              name="images"
              render={({ field: { onChange, ref, name } }) => (
                <FormItem>
                  <FormLabel>Fotos</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Fotos"
                      type="file"
                      multiple
                      name={name}
                      ref={ref}
                      onChange={(e) => onChange(e.target.files)}
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
                      <Image
                        className="size-40 rounded-t-md"
                        src={`/products/${url}`}
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
                        Eliminar
                        <Trash2Icon />
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
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Precio</FormLabel>
                  <FormControl>
                    <Input placeholder="Precio" type="number" {...field} />
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
              render={({ field }) => (
                <FormItem>
                  <FormLabel>inStock</FormLabel>
                  <FormControl>
                    <Input placeholder="inStock" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Categoría</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccine una categoría" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Categoría</SelectLabel>
                          {categories.map(({ id, name }) => (
                            <SelectItem key={id} value={name}>
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
          <Button
            className={cn(
              buttonVariants({ variant: "default" }),
              "w-full lg:w-1/3 mt-4"
            )}
            type="submit"
            disabled={!isValid}
          >
            Guardar
            <SaveIcon />
          </Button>
        </form>
      </Form>
    </div>
  );
};
