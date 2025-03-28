"use client";
import {
  PayPalButtonsComponentProps,
  PayPalButtons as PayPalButtonsPincipal,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
import { PayPalButtonsSkeleton } from "@/components/orders/paypal-buttons-skeleton";
import {
  CreateOrderData,
  CreateOrderActions,
  OnApproveActions,
  OnApproveData,
} from "@paypal/paypal-js";
import { PayPalButtonsProps } from "@/interfaces/paypal-buttons-props";
import { setTransactionId } from "@/actions/payments/set-transaction-id";
import { paypalCheckPayment } from "@/actions/payments/paypal-payment";

export const PayPalButtons = ({
  orderId,
  amount,
  ...props
}: PayPalButtonsProps) => {
  const roundedAmount = Math.round(amount * 100) / 100;

  const [{ isPending }] = usePayPalScriptReducer();

  const creteOrder: PayPalButtonsComponentProps["createOrder"] = async (
    data: CreateOrderData,
    action: CreateOrderActions
  ): Promise<string> => {
    const transactionId = await action.order.create({
      intent: "CAPTURE",
      purchase_units: [
        {
          // invoice_id: "",
          amount: {
            currency_code: "USD",
            value: `${roundedAmount}`,
          },
        },
      ],
    });

    console.log(transactionId);

    const { ok } = await setTransactionId({
      orderId,
      transactionId,
    });

    if (!ok) {
      throw new Error("No se pudo actualizar la orden");
    }

    return transactionId;
  };

  const onApprove: PayPalButtonsComponentProps["onApprove"] = async (
    data: OnApproveData,
    actions: OnApproveActions
  ) => {
    const details = await actions.order?.capture();

    if (!details || !details.id) return;

    await paypalCheckPayment({ paypalTransationId: details.id });

    

  };

  return (
    <>
      {isPending ? (
        <PayPalButtonsSkeleton {...props} />
      ) : (
        <PayPalButtonsPincipal
          {...props}
          onApprove={onApprove}
          createOrder={creteOrder}
        />
      )}
    </>
  );
};
