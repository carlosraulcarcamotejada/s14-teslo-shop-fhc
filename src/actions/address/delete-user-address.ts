"use server";
import prisma from "@/lib/prisma";
import { DeleteUserAddress } from "@/interfaces/actions/delete-user-address";

export const deleteUserAddress = async ({ userId }: DeleteUserAddress) => {
  try {
    const foundAddress = await prisma.userAddress.findUnique({
      where: { userId },
    });

    if (foundAddress) {
      const resultAddress = await prisma.userAddress.delete({
        where: { userId },
      });
      return {
        ok: true,
        deletedAddress: resultAddress ?? "The address could not be deleted",
      };
    }

    if (!foundAddress) {
      return {
        ok: true,
        message: "The address could not be deleted",
      };
    }
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: "The address could not be deleted",
    };
  }
};
