"use server";
import { Address } from "@/interfaces/address";
import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export const setUserAddress = async (address: Address, userId: string) => {
  try {
    const resultAddress = await createOrUpdateAddress(address, userId);
    return {
      resultAddres: resultAddress ?? "The address could not be recorded.",
      ok: true,
    };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return {
        code: error.code,
        message: `Prisma error: ${error.message}`,
        ok: false,
        categories: [],
      };
    } else if (error instanceof Error) {
      return {
        message: error.message,
        ok: false,
        categories: [],
      };
    } else {
      return {
        message: "An unknown error occurred.",
        ok: false,
        categories: [],
      };
    }
  }
};

const createOrUpdateAddress = async (address: Address, userId: string) => {
  try {
    const storedAddress = await prisma.userAddress.findUnique({
      where: { userId },
    });

    const { country: countryId, saveForm = false, ...restAddress } = address;
    // Cuando encuentra una dirección, esta es actualizasa
    if (storedAddress) {
      const updatedAddress = await prisma.userAddress.update({
        where: {
          userId,
        },
        data: {
          ...restAddress,
          countryId,
          saveForm,
          userId,
        },
      });
      return updatedAddress;
    }
    // Si no encuentra la dirección, entonces la crea
    if (!storedAddress) {
      const createdAddress = await prisma.userAddress.create({
        data: {
          ...restAddress,
          countryId,
          saveForm,
          userId,
        },
      });
      return createdAddress;
    }
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return {
        code: error.code,
        message: `Prisma error: ${error.message}`,
        ok: false,
        categories: [],
      };
    } else if (error instanceof Error) {
      return {
        message: error.message,
        ok: false,
        categories: [],
      };
    } else {
      return {
        message: "An unknown error occurred.",
        ok: false,
        categories: [],
      };
    }
  }
};
