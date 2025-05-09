"use server";
import { Prisma } from "@prisma/client";
import prisma from "@/lib/prisma";
import { Address } from "@/interfaces/shared/address";
import { GetUserAddressArgs } from "@/interfaces/actions/get-user-address-args";
import { ApiResponse } from "@/interfaces/actions/api-response";

export const getUserAddress = async ({
  userId,
}: GetUserAddressArgs): Promise<
  ApiResponse & { userAddressFound?: Address }
> => {
  try {
    const userAddressData = await prisma.userAddress.findUnique({
      where: { userId },
    });

    if (!userAddressData) {
      return {
        message: "No se encontró la dirección del usuario",
        success: false,
      };
    }

    const { address2, countryId, ...restResultAddress } = userAddressData;

    const userAddressFound: Address = {
      address2: address2 ?? undefined,
      country: countryId,
      ...restResultAddress,
    };

    return {
      message: "La dirección del usuario fue obtenida exitosamente",
      success: true,
      userAddressFound,
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
