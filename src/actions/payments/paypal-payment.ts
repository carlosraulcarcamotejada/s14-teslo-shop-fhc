"use server";
import { Prisma } from "@prisma/client";
import { PaypalCheckPayment } from "@/interfaces/paypal-payment";

export const paypalCheckPayment = async ({
  paypalTransationId,
}: PaypalCheckPayment) => {
  try {
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
