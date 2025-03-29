interface PaypalCheckPayment {
  paypalTransactionId: string;
}

interface PaypalVerifyPayment {
  paypalTransactionId: string;
  bearerToken: string;
}

export type { PaypalCheckPayment };
export type { PaypalVerifyPayment };
