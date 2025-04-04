"use server";
import { Address } from "@/interfaces/address";
import { GetUserAddress } from "@/interfaces/get-user-address";
import prisma from "@/lib/prisma";

export const getUserAddress = async ({ userId }: GetUserAddress) => {
  try {
    const resultAddress = await prisma.userAddress.findUnique({
      where: { userId },
    });
    // console.log(resultAddress);

    if (resultAddress) {
      const { address2, countryId, ...restResultAddress } = resultAddress;

      const address: Address = {
        address2: resultAddress.address2 ?? "",
        country: resultAddress.countryId,
        ...restResultAddress,
      };
      return address;
    }

    if (!resultAddress) {
      return undefined;
    }
  } catch (error) {
    console.log(error);
    return undefined;
  }
};
