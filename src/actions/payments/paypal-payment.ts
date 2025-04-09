"use server";
import {
  PaypalCheckPayment,
  PaypalVerifyPayment,
} from "@/interfaces/paypal-payment";
import { PaypalOrderStatusResp } from "@/interfaces/paypal-order-status-response";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { Prisma } from "@prisma/client";

export const paypalCheckPayment = async ({
  paypalTransactionId,
}: PaypalCheckPayment): Promise<{
  ok: boolean;
  message?: string;
  code?: string;
}> => {
  const bearerToken = await getPaypalBearerToken();

  if (!bearerToken || typeof bearerToken === "object") {
    return {
      ok: false,
      message: "No se pudo obtener el token de verificación.",
    };
  }

  const resp = await paypalVerifyPayment({
    bearerToken,
    paypalTransactionId,
  });

  if (!("status" in resp) || !("purchase_units" in resp)) {
    return {
      ok: false,
      message: "Error al verificar el pago.",
    };
  }

  const { status, purchase_units } = resp;
  const { invoice_id: orderId } = purchase_units[0];

  if (status !== "COMPLETED") {
    return {
      ok: false,
      message: "Aún no se ha pagado en PayPayl.",
    };
  }

  try {
    console.log({ status, purchase_units });

    await prisma.order.update({
      where: {
        id: orderId,
      },
      data: { isPaid: true, paidAt: new Date() },
    });

    revalidatePath(`/orders/${orderId}`);

    return {
      ok: true,
    };
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

const getPaypalBearerToken = async (): Promise<
  string | { ok: false; message?: string; code?: string }
> => {
  const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
  const PAYPAL_SECRET = process.env.PAYPAL_SECRET;
  const PAYPAL_OAUTH_URL = process.env.PAYPAL_OAUTH_URL ?? "";

  const base64Auth = Buffer.from(
    `${PAYPAL_CLIENT_ID}:${PAYPAL_SECRET}`,
    "utf-8"
  ).toString("base64");

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
  myHeaders.append("Authorization", `Basic ${base64Auth}`);

  const urlencoded = new URLSearchParams();
  urlencoded.append("grant_type", "client_credentials");

  try {
    const results = await fetch(PAYPAL_OAUTH_URL, {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
      cache: "no-store",
    }).then((resp) => resp.json());
    return results.access_token;
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return {
        code: error.code,
        message: `Prisma error: ${error.message}`,
        ok: false,
      };
    } else if (error instanceof Error) {
      return {
        message: error.message,
        ok: false,
      };
    } else {
      return {
        message: "An unknown error occurred.",
        ok: false,
      };
    }
  }
};

const paypalVerifyPayment = async ({
  bearerToken,
  paypalTransactionId,
}: PaypalVerifyPayment): Promise<
  PaypalOrderStatusResp | { ok: boolean; message: string; code?: string }
> => {
  try {
    const PAYPAL_ORDERS_URL = process.env.PAYPAL_ORDERS_URL ?? "";

    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${bearerToken}`);

    const resp = await fetch(`${PAYPAL_ORDERS_URL}/${paypalTransactionId}`, {
      method: "GET",
      headers: myHeaders,
      cache: "no-store",
    }).then((resp) => resp.json());

    if (!("id" in resp)) {
      throw new Error("invalid resp");
    }

    return resp;
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return {
        code: error.code,
        message: `Prisma error: ${error.message}`,
        ok: false,
      };
    } else if (error instanceof Error) {
      return {
        message: error.message,
        ok: false,
      };
    } else {
      return {
        message: "An unknown error occurred.",
        ok: false,
      };
    }
  }
};
