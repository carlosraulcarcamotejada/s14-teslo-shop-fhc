interface PaypalCheckPayment {
  paypalTransactionId: string;
}

interface PaypalVerifyPayment {
  bearerToken: string;
  paypalTransactionId: string;
}

export type { PaypalCheckPayment };
export type { PaypalVerifyPayment };
