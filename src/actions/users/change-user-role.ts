"use server";

import { auth } from "@/config/auth.config";
import { ChangeUserRole } from "@/interfaces/change-user-role";
import { UserRole } from "@/interfaces/user/user";
import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const changeUserRole = async ({ role, userId }: ChangeUserRole) => {
  try {
    const session = await auth();

    if (session?.user.role !== "admin") {
      return {
        ok: false,
        message: "Necesita privilegios de administrador.",
      };
    }

    const newRole: UserRole =
      role === "admin" || role === "user" ? role : "user";

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { role: newRole },
    });

    revalidatePath("/admin/users");

    return {
      ok: true,
      updatedUser,
      message: "usuario actualizado correctamente.",
    };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return {
        ok: false,
        message: `Prisma error: ${error.message}`,
        code: error.code, // PrismaClientKnownRequestError tiene un código de error
      };
    } else if (error instanceof Error) {
      return {
        ok: false,
        message: error.message,
      };
    } else {
      return {
        ok: false,
        message: "An unknown error occurred.",
      };
    }
  }
};
