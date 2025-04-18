"use server";
import prisma from "@/lib/prisma";
import bcryptjs from "bcryptjs";
import { AuthError } from "next-auth";
import { Register } from "@/interfaces/actions/register";

export const register = async ({
  formData,
}: Register): Promise<{
  status: string;
  user?: {
    email: string;
    name: string;
    id: string;
  };
}> => {
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

    return { status: "success", user };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { status: "Invalid credentials." };
        default:
          return { status: "Something went wrong." };
      }
    }
    throw error;
  }
};
