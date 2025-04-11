"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
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
import { SaveIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { ProductFormProps } from "@/interfaces/product/product-form-props";
import { Textarea } from "@/components/ui/textarea";
import { productFormSchema } from "@/schema/product-form-schema";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Product } from "@/interfaces/product/product";

export const ProductForm = ({
  categories,
  className,
  product,
  ...props
}: ProductFormProps) => {
  const { sizes } = product;

  // const router = useRouter();

  // 1. Define your default values.
  const defaultProductValues: Product = {
    category: "non-category",
    description: "",
    id: "",
    images: [],
    inStock: 0,
    price: 0,
    sizes: [],
    slug: "",
    tags: [],
    title: "",
    type: "shirts",
  };

  // 2. Define your form.
  const form = useForm<Product>({
    resolver: zodResolver(productFormSchema),
    defaultValues: defaultProductValues,
  });

  // 3. Define a submit handler.
  async function onSubmit(values: Product) {
    console.log(values);
  }

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
              render={({}) => (
                <FormItem>
                  <FormLabel>Tallas</FormLabel>
                  <FormControl>
                    <ToggleGroup
                      className="flex flex-wrap justify-start items-center"
                      type="multiple"
                    >
                      {sizes.map((size: string, index: number) => (
                        <ToggleGroupItem
                          variant="outline"
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
              name="images"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Fotos</FormLabel>
                  <FormControl>
                    <Input placeholder="Fotos" type="file" {...field} />
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
                        {categories.map(({ id, name }) => (
                          <SelectItem key={id} value={name}>
                            {name}
                          </SelectItem>
                        ))}
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
            disabled={!form.formState.isValid}
          >
            Guardar
            <SaveIcon />
          </Button>
        </form>
      </Form>
    </div>
  );
};
