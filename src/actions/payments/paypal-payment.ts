"use server";
import { revalidatePath } from "next/cache";
import { Prisma } from "@prisma/client";
import prisma from "@/lib/prisma";
import { ApiResponse } from "@/interfaces/actions/api-response";
import { PaypalOrderStatusResp } from "@/interfaces/paypal/paypal-order-status-response";
import {
  PaypalCheckPaymentArgs,
  PaypalVerifyPaymentArgs,
} from "@/interfaces/paypal/paypal-payment-args";

export const paypalCheckPayment = async ({
  paypalTransactionId,
}: PaypalCheckPaymentArgs): Promise<ApiResponse> => {
  const bearerToken = await getPaypalBearerToken();

  if (!bearerToken || typeof bearerToken === "object") {
    return {
      message: "No se pudo obtener el token de verificación.",
      success: false,
    };
  }

  const resp = await paypalVerifyPayment({
    bearerToken,
    paypalTransactionId,
  });

  if (!("status" in resp) || !("purchase_units" in resp)) {
    return {
      message: "Error al verificar el pago.",
      success: false,
    };
  }

  const { status, purchase_units } = resp;
  const { invoice_id: orderId } = purchase_units[0];

  if (status !== "COMPLETED") {
    return {
      success: false,
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
      message: "Pago realizado",
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
        message: "Se produjo un error desconocido",
        success: false,
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
}: PaypalVerifyPaymentArgs): Promise<
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
