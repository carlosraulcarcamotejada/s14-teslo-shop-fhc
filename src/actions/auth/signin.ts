"use server";

import { SignInFormSchema } from "@/components/auth/sign-in-form";
import prisma from "@/lib/prisma";
import { z } from "zod";
import bcryptjs from "bcryptjs";
import { AuthError } from "next-auth";

export const register = async (formData: z.infer<typeof SignInFormSchema>) => {
  try {
    const user = await prisma.user.create({
      data: {
        name: formData.name,
        email: formData.email.toLowerCase(),
        password: bcryptjs.hashSync(formData.password),
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
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
