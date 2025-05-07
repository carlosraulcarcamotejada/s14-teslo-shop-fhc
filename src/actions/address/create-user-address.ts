"use server";
import { Prisma } from "@prisma/client";
import prisma from "@/lib/prisma";
import { ApiResponse } from "@/interfaces/actions/api-response";
import { Address } from "@/interfaces/shared/address";
import { CreateUserAddressArgs } from "@/interfaces/actions/create-user-address-args";

export const createUserAddress = async ({
  address,
  userId,
}: CreateUserAddressArgs): Promise<
  ApiResponse & { createdUserAddress?: Address }
> => {
  try {
    const { country, saveForm = false, ...restAddress } = address;

    const createdUserAddressData = await prisma.userAddress.create({
      data: {
        ...restAddress,
        countryId: country,
        saveForm,
        userId,
      },
    });

    if (!createUserAddress) {
      return {
        message: "No se pudo crear la dirección del usuario",
        success: false,
      };
    }

    const { address2, countryId, ...restCreatedUserAddressData } =
      createdUserAddressData;

    const createdUserAddress: Address = {
      address2: address2 ?? undefined,
      country: countryId,
      ...restCreatedUserAddressData,
    };

    return {
      createdUserAddress,
      message: "Dirección de usuario creada exitosamente",
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
