/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useContext, useEffect, useMemo, useState } from "react";

import { App } from "@/interfaces/app";
import { Auth } from "@/interfaces/auth";

export const PaymentContext = createContext({} as App.PaymentData);

export function PaymentProvider({ children }: Auth.Children) {
  const [paymentObject, setPaymentObject] = useState<App.Payment | null>(null);
  const [selectedAddress, setSelectedAddress] = useState<Auth.Address | null>(
    null
  );
  const [purchase, setPurchase] = useState<boolean>(false);

  const paymentValue = useMemo(
    () => ({
      paymentObject,
      setPaymentObject,
      selectedAddress,
      setSelectedAddress,
      purchase,
      setPurchase,
    }),
    [paymentObject, selectedAddress, purchase]
  );

  return (
    <PaymentContext.Provider value={paymentValue}>
      {children}
    </PaymentContext.Provider>
  );
}

export const usePayment = () => {
  const context = useContext<App.PaymentData>(PaymentContext);
  if (context === undefined) {
    throw new Error(`usePayment must be used within a PaymentProvider.`);
  }
  return context;
};
