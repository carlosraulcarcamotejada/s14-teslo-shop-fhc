"use client";
import { ComponentPropsWithoutRef } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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

export const SignInForm = ({
  className,
  ...props
}: ComponentPropsWithoutRef<"div">) => {
  // 1. Define your schema.
  const SignInFormSchema = z.object({
    email: z.string().email("Debe ser un email válido."),
    name: z
      .string()
      .min(3, "El nombre debe contener al menos 3 caracteres.")
      .max(50, "El nombre debe contener máximo  caracteres."),
    password: z.string().min(1, "La contraseña es obligatoria."),
  });

  // 2. Define your default values.
  const defaultValues: z.infer<typeof SignInFormSchema> = {
    email: "",
    name: "",
    password: "",
  };

  // 3. Define your form.
  const form = useForm<z.infer<typeof SignInFormSchema>>({
    resolver: zodResolver(SignInFormSchema),
    defaultValues,
  });

  // 4. Define a submit handler.
  function onSubmit(values: z.infer<typeof SignInFormSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <div className={cn("", className)}>
      <Form {...form} {...props}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-6"
        >
          <div className="flex flex-col items-center gap-2 text-center">
            <h1 className="text-2xl font-bold">Registre su cuenta</h1>
            <p className="text-balance text-sm text-muted-foreground">
              Ingrese los datos solicitados para registrar su cuenta
            </p>
          </div>
          <div className="grid gap-6">
            <div className="grid gap-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre completo</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Nombre completo"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid gap-2">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Correo electrónico</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="m@example.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid gap-2">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contraseña</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" className="w-full">
              Registrarse
            </Button>
            <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
              <span className="relative z-10 bg-background px-2 text-muted-foreground">
                O
              </span>
            </div>

            <div className="text-center text-sm">
              <Link
                href="login"
                className={cn(
                  buttonVariants({ variant: "secondary" }),
                  "w-full"
                )}
              >
                Ingresar
              </Link>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};
