"use server";
import { Prisma } from "@prisma/client";
import prisma from "@/lib/prisma";
import { DeleteUserAddressArgs } from "@/interfaces/actions/delete-user-address-args";
import { ApiResponse } from "@/interfaces/actions/api-response";
import { Address } from "@/interfaces/shared/address";

export const deleteUserAddress = async ({
  userId,
}: DeleteUserAddressArgs): Promise<
  ApiResponse & { deletedAddress?: Address }
> => {
  try {
    const foundAddress = await prisma.userAddress.findUnique({
      where: { userId },
    });

    if (!foundAddress) {
      return {
        message: "No se encontró la dirección",
        success: false,
      };
    }

    const deletedAddressData = await prisma.userAddress.delete({
      where: { userId },
    });

    if (!deletedAddressData) {
      return {
        message: "No se pudo eliminar la dirección del usuario",
        success: false,
      };
    }

    const {
      address2 = undefined,
      countryId,
      ...restResultAddress
    } = deletedAddressData;

    const deletedAddress: Address = {
      country: countryId,
      address2: address2 ?? undefined,
      ...restResultAddress,
    };

    return {
      deletedAddress,
      message: "La dirección no pudo ser eliminada",
      success: true,
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
        message: "Ocurrió un Error desconocido",
        success: false,
      };
    }
  }
};
