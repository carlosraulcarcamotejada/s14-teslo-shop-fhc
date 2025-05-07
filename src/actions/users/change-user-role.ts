"use server";
import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { auth } from "@/config/auth.config";
import { ApiResponse } from "@/interfaces/actions/api-response";
import { ChangeUserRoleArgs } from "@/interfaces/actions/change-user-role-args";
import { User, UserRole } from "@/interfaces/user/user";
import { revalidatePath } from "next/cache";

export const changeUserRole = async ({
  role,
  userId,
}: ChangeUserRoleArgs): Promise<ApiResponse & { updatedUser?: User }> => {
  try {
    const session = await auth();

    if (session?.user.role !== "admin") {
      return {
        message: "Necesita privilegios de administrador.",
        success: false,
      };
    }

    const newRole: UserRole =
      role === "admin" || role === "user" ? role : "user";

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { role: newRole },
    });

    if (!updatedUser) {
      return {
        message: "No se pudo actualizar el rol del usuario",
        success: false,
      };
    }

    revalidatePath("/admin/users");

    return {
      message: "usuario actualizado correctamente.",
      success: true,
      updatedUser,
    };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return {
        code: error.code,
        message: `Prisma error: ${error.message}`,
        success: false,
      };
    } else if (error instanceof Error) {
      return {
        message: error.message,
        success: false,
      };
    } else {
      return {
        message: "No hay productos en el pedido",
        success: false,
      };
    }
  }
};
