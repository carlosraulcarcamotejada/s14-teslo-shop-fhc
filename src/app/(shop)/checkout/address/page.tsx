"use client";
import { Title } from "@/components/shared/title";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Link from "next/link";

export default function AddressPage() {
  // 1. Define your schema.
  const formSchema = z.object({
    names: z
      .string()
      .min(3, "Nombres, debe contener al menos 3 caracteres.")
      .max(50, "Nombres, debe contener máximo 50 caracteres."),
    lastnames: z
      .string()
      .min(3, "Apellidos, debe contener al menos 3 caracteres.")
      .max(50, "Apellidos, debe contener máximo 50 caracteres."),
    address: z
      .string()
      .min(3, "Dirección debe contener al menos 3 caracteres.")
      .max(100, "Dirección debe contener máximo 100 caracteres."),
    address2: z.string().optional(),
    zipCode: z
      .string()
      .min(3, "Código postal debe contener al menos 3 caracteres.")
      .max(10, "Código postal debe contener máximo 10 caracteres."),
    city: z
      .string()
      .min(3, "Ciudad debe contener al menos 3 caracteres.")
      .max(100, "Ciudad debe contener máximo 100 caracteres."),
    mobilePhone: z
      .string()
      .min(8, "Teléfono debe contener al menos 8 caracteres.")
      .max(20, "Teléfono debe contener máximo 100 caracteres."),
    country: z.string(),
    // .min(3, "País debe contener al menos 3 caracteres.")
    // .max(100, "País debe contener máximo 100 caracteres."),
  });

  // 2. Define your default values.
  const defaultValues: z.infer<typeof formSchema> = {
    address: "",
    address2: "",
    city: "",
    country: "",
    lastnames: "",
    mobilePhone: "",
    names: "",
    zipCode: "",
  };

  // 3. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  // 4. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid lg:grid-cols-10 pb-40 py-6"
      >
        <div className="lg:col-start-2 lg:col-span-8">
          <Title title="Dirección" subTitle="Dirección de entrega" />

          <div className="grid grid-cols-1 gap-2 sm:gap-5 sm:grid-cols-2 mt-8">
            <FormField
              control={form.control}
              name="names"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombres</FormLabel>
                  <FormControl>
                    <Input placeholder="Nombres" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="lastnames"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Apellidos</FormLabel>
                  <FormControl>
                    <Input placeholder="Apellidos" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Dirección</FormLabel>
                  <FormControl>
                    <Input placeholder="Dirección" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="address2"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Dirección 2 (opcional)</FormLabel>
                  <FormControl>
                    <Input placeholder="Dirección 2 (opcional)" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="zipCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Código postal</FormLabel>
                  <FormControl>
                    <Input placeholder="Código postal" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ciudad</FormLabel>
                  <FormControl>
                    <Input placeholder="Ciudad" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>País</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="País" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="cr">Costa Rica</SelectItem>
                      <SelectItem value="hn">Honduras</SelectItem>
                      <SelectItem value="sv">El Salvador</SelectItem>
                      <SelectItem value="nc">Nicaragua</SelectItem>
                      <SelectItem value="gt">Guatemala</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="mobilePhone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Teléfono</FormLabel>
                  <FormControl>
                    <Input placeholder="Teléfono" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid w-full items-center gap-1.5">
              <Link
                href="/checkout"
                type="submit"
                className={cn(buttonVariants({ variant: "default" }))}
              >
                Siguiente
              </Link>
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
}
