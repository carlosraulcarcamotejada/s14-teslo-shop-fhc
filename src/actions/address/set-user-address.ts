"use server";
import { Address } from "@/interfaces/address";
import prisma from "@/lib/prisma";

export const setUserAddress = async (address: Address, userId: string) => {
  try {
    const resultAddress = await createOrUpdateAddress(address, userId);
    return {
      resultAddres: resultAddress ?? "The address could not be recorded.",
      ok: true,
    };
  } catch (error) {
    console.log("the address could not be recorded");
    return {
      ok: false,
      message: "The address could not be recorded.",
    };
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
    throw new Error("the address could not be recorded");
  }
};
