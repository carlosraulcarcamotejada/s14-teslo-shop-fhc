interface PaypalCheckPaymentArgs {
  paypalTransactionId: string;
}

interface PaypalVerifyPaymentArgs {
  bearerToken: string;
  paypalTransactionId: string;
}

export type { PaypalCheckPaymentArgs };
export type { PaypalVerifyPaymentArgs };
