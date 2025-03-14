"use client";
import { ComponentPropsWithoutRef, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GithubLogo } from "@/components/icon/github-logo";
import { GoogleLogo } from "@/components/icon/google-logo";

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
import { authenticate } from "@/actions/auth/login";
import { useRouter } from "next/navigation";
import { useActionState } from "react";

interface LoginFormProps extends ComponentPropsWithoutRef<"div"> {}

// 1. Define your schema.
export const LoginFormSchema = z.object({
  email: z.string().email("Debe proporcionar un email válido."),
  password: z.string().min(1, "La contraseña es obligatoria."),
});

// 2. Define your default values.
const defaultValues: z.infer<typeof LoginFormSchema> = {
  email: "",
  password: "",
};

export const LoginForm = ({ className, ...props }: LoginFormProps) => {
  const router = useRouter();

  // 3. Define your form.
  const form = useForm<z.infer<typeof LoginFormSchema>>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues,
  });

  // 4. Define a submit handler.
  async function onSubmit(values: z.infer<typeof LoginFormSchema>) {
    try {
      // Crear un FormData y agregar los valores
      const formData = new FormData();
      formData.append("email", values.email);
      formData.append("password", values.password);
      const results = await authenticate(undefined, formData);

      results === "success" && router.replace("/");
    } catch (error) {
      console.log("Something went wrong.");
    }
  }

  return (
    <div className={cn("", className)} {...props}>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-6"
        >
          <div className="flex flex-col items-center gap-2 text-center">
            <h1 className="text-2xl font-bold">Inicie sesión en su cuenta</h1>
            <p className="text-balance text-sm text-muted-foreground">
              Ingrese su correo electrónico a continuación para iniciar sesión
              en su cuenta
            </p>
          </div>
          <div className="grid gap-6">
            <div className="grid gap-2">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Correo electrónico</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
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
                    <div className="flex items-center">
                      <FormLabel>Contraseña</FormLabel>
                      <Link
                        href="#"
                        className="ml-auto text-sm underline-offset-4 hover:underline"
                      >
                        ¿Olvidaste tu contraseña?
                      </Link>
                    </div>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" className="w-full">
              Acceder
            </Button>
            <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
              <span className="relative z-10 bg-background px-2 text-muted-foreground">
                O continuar con
              </span>
            </div>
            <Button type="button" variant="outline" className="w-full">
              <GoogleLogo />
              Iniciar sesión con Google
            </Button>
            <Button type="button" variant="outline" className="w-full">
              <GithubLogo />
              Iniciar sesión con GitHub
            </Button>
          </div>
          <div className="text-center text-sm">
            ¿No tienes una cuenta?{" "}
            <Link
              href="sign-in"
              className="text-sm underline-offset-4 hover:underline"
            >
              Regístrate
            </Link>
          </div>
        </form>
      </Form>
    </div>
  );
};
