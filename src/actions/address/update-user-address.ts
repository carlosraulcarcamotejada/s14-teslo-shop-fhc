"use server";
import { Prisma } from "@prisma/client";
import prisma from "@/lib/prisma";
import { ApiResponse } from "@/interfaces/actions/api-response";
import { Address } from "@/interfaces/shared/address";
import { UpdateUserAddressArgs } from "@/interfaces/actions/update-user-address-args";

export const updateUserAddress = async ({
  address,
  userId,
}: UpdateUserAddressArgs): Promise<
  ApiResponse & { updatedUserAddress?: Address }
> => {
  try {
    const { country, ...restAddress } = address;

    const updatedUserAddressData = await prisma.userAddress.update({
      where: {
        userId,
      },
      data: {
        ...restAddress,
        countryId: country,
        userId,
      },
    });

    if (!updatedUserAddressData) {
      return {
        message: "No se pudo actualizar la dirección del usuario",
        success: false,
      };
    }

    const { address2, countryId, ...restResultAddress } =
      updatedUserAddressData;

    const updatedUserAddress: Address = {
      address2: address2 ?? undefined,
      country: countryId,
      ...restResultAddress,
    };

    return {
      message: "Dirección de usuario actualizada exitosamente",
      success: false,
      updatedUserAddress,
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
