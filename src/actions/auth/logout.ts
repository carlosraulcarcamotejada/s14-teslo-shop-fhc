"use server";
import { AuthError } from "next-auth";
import { signOut } from "@/config/auth.config";
import { ApiResponse } from "@/interfaces/actions/api-response";

export const logout = async (): Promise<ApiResponse> => {
  try {
    await signOut();
    return {
      message: "Usuario desconectado correctamente",
      success: true,
    };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return {
            code: error.message,
            message: "Invalid credentials",
            success: false,
          };
        default:
          return {
            code: error.message,
            message: "Something went wrong",
            success: false,
          };
      }
    }
    return {
      message: "Error desconocido",
      success: false,
    };
  }
};
