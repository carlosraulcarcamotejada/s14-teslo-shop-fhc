"use client";
import { Provider } from "react-redux";
import { persistor, store } from "@/store/store";
import { PersistGate } from "redux-persist/integration/react";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "@/components/ui/sonner";
import {
  PayPalScriptProvider,
  ScriptProviderProps,
} from "@paypal/react-paypal-js";

const providerProps: ScriptProviderProps = {
  options: {
    clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID ?? "",
    intent: "capture",
    currency: "USD",
  },
};

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <PersistGate loading={null} persistor={persistor}>
      <Provider store={store}>
        <SessionProvider>
          <PayPalScriptProvider options={providerProps.options}>
            {children}
            <Toaster />
          </PayPalScriptProvider>
        </SessionProvider>
      </Provider>
    </PersistGate>
  );
}
