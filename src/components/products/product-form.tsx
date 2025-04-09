"use client";
import { useRouter } from "next/navigation";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
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
import { addressFormSchema } from "@/schema/address-form-schema";
import { cn } from "@/lib/utils";
import { ProductFormProps } from "@/interfaces/product-form-props";
import { Product } from "@/seed/seed";

export const ProductForm = ({ className, ...props }: ProductFormProps) => {
  const router = useRouter();

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
    resolver: zodResolver(addressFormSchema),
    defaultValues: defaultProductValues,
  });

  // 3. Define a submit handler.
  async function onSubmit(values: Product) {}

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
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descripción</FormLabel>
                  <FormControl>
                    <Input placeholder="Descripción" {...field} />
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
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Precio</FormLabel>
                  <FormControl>
                    <Input placeholder="Precio" {...field} />
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

            {/* <FormField
              control={form.control}
              name="type"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>País</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccine un país" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {countries.map(({ id, name }) => (
                          <SelectItem key={id} value={id}>
                            {name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                );
              }}
            /> */}

            {/* <FormField
              control={form.control}
              name=""
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Teléfono</FormLabel>
                  <FormControl>
                    <Input placeholder="Teléfono" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> */}

            {/* <FormField
              control={form.control}
              name="saveForm"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-start space-x-3 space-y-0 p-2 border# rounded-md my-2">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel>¿Recordar dirección?</FormLabel>
                  <FormMessage />
                </FormItem>
              )}
            /> */}
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
