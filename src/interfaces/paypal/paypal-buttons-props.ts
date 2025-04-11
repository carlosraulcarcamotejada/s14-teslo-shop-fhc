import { PayPalButtonsComponentProps } from "@paypal/react-paypal-js";

interface PayPalButtonsProps extends PayPalButtonsComponentProps {
  orderId: string;
  amount: number;
}

export type { PayPalButtonsProps };
