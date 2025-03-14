"use server";

import { LoginFormSchema } from "@/components/auth/login-form";
import { signIn } from "@/config/auth.config";
import { AuthError } from "next-auth";
import { z } from "zod";

// ...

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    await signIn("credentials", {
      ...Object.fromEntries(formData),
      redirect: false,
    });
    return "success";
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
}

export const login = async (formData: z.infer<typeof LoginFormSchema>) => {
  try {
    await signIn("credentials", {
      ...formData,
      redirect: false,
    });

    return "success";
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
};
