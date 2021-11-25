/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useContext, useEffect, useMemo, useState } from "react";

import { App } from "@/interfaces/app";
import { Auth } from "@/interfaces/auth";

export const PaymentContext = createContext({} as App.PaymentData);

export function PaymentProvider({ children }: Auth.Children) {
  const [paymentObject, setPaymentObject] = useState<App.Payment | null>(null);
  const [paymentLoading, setPaymentLoading] = useState<boolean>(false);

  useEffect(() => {
      setPaymentLoading(true)
  }, [paymentLoading])

  const paymentValue = useMemo(
    () => ({
      paymentLoading,
      paymentObject,
      setPaymentObject,
    }),
    [paymentObject, paymentLoading]
  );

  return <PaymentContext.Provider value={paymentValue}>{paymentLoading && children}</PaymentContext.Provider>;
}

export const usePayment = () => {
  const context = useContext<App.PaymentData>(PaymentContext);
  if (context === undefined) {
    throw new Error(`usePayment must be used within a PaymentProvider.`);
  }
  return context;
};
