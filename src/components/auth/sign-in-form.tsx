"use client";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { register } from "@/actions/auth/signin";
import { useRouter } from "next/navigation";
import { login } from "@/actions/auth/login";
import { SignIn } from "@/interfaces/sign-in";
import { SignInFormSchema } from "@/schema/signIn-form-schema";
import { SignInFormProps } from "@/interfaces/signIn-form-props";
import { useCart } from "@/hooks/use-cart";

export const SignInForm = ({ className, ...props }: SignInFormProps) => {
  const { clearCart } = useCart();
  const router = useRouter();

  // 1. Define your default values.
  const defaultValues: SignIn = {
    email: "",
    name: "",
    password: "",
  };

  // 2. Define your form.
  const form = useForm<SignIn>({
    resolver: zodResolver(SignInFormSchema),
    defaultValues,
  });

  // 3. Define a submit handler.
  async function onSubmit(values: SignIn) {
    try {
      const results = await register(values);
      const resultsLogin = await login({
        ...values,
        email: values.email.toLowerCase(),
      });

      console.log(resultsLogin);
      if (results.status === "success" && resultsLogin === "success") {
        clearCart();
        router.replace("/");
      }
    } catch (error) {
      console.log("Something went wrong.", error);
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
                className={cn(buttonVariants({ variant: "outline" }), "w-full")}
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
