"use server";
import prisma from "@/lib/prisma";
import bcryptjs from "bcryptjs";
import { AuthError } from "next-auth";
import { RegisterArgs } from "@/interfaces/actions/register-args";
import { ApiResponse } from "@/interfaces/actions/api-response";

export const register = async ({
  formData,
}: RegisterArgs): Promise<
  ApiResponse & {
    status: string;
    user?: { email: string; name: string; id: string };
  }
> => {
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

    return {
      status: "success",
      message: "Usuario registrado exitosamente",
      success: true,
      user,
    };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return {
            code: error.message,
            message: "Invalid credentials",
            status: "unsuccessful",
            success: false,
          };
        default:
          return {
            code: error.message,
            message: "Invalid credentials",
            status: "unsuccessful",
            success: false,
          };
      }
    }
    return {
      message: "Error desconocido",
      status: "unsuccessful",
      success: false,
    };
  }
};
