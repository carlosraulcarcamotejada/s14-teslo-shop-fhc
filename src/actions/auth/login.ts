"use server";
import { AuthError } from "next-auth";
import { signIn } from "@/config/auth.config";
import { AuthenticateArgs } from "@/interfaces/actions/authenticate-args";
import { Login } from "@/interfaces/auth/login";
import { ApiResponse } from "@/interfaces/actions/api-response";

export const authenticate = async ({
  formData,
}: AuthenticateArgs): Promise<
  ApiResponse & { result: "success" | "unsuccess" }
> => {
  try {
    await signIn("credentials", {
      ...Object.fromEntries(formData),
      redirect: false,
    });
    return {
      success: true,
      message: "Autenticado exitosamente",
      result: "success",
    };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return {
            code: error.message,
            message: "Invalid credentials",
            success: false,
            result: "unsuccess",
          };
        default:
          return {
            code: error.message,
            message: "Something went wrong",
            success: false,
            result: "unsuccess",
          };
      }
    }
    return {
      message: "Error desconocido",
      success: false,
      result: "unsuccess",
    };
  }
};

export const login = async ({ ...restformData }: Login) => {
  try {
    await signIn("credentials", {
      ...restformData,
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
