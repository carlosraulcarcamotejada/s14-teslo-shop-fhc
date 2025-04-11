"use server";
import { Address } from "@/interfaces/shared/address";
import { GetUserAddress } from "@/interfaces/actions/get-user-address";
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
        address2: address2 ?? "",
        country: countryId,
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
