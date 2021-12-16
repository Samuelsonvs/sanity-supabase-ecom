import { Dispatch, SetStateAction } from "react";
import {
  User,
  AuthSession,
  UserCredentials,
  Provider,
} from "@supabase/supabase-js";

import { App } from "./app";

namespace Auth {
  interface Children {
    children: JSX.Element;
  }

  interface Basket {
    _id: string;
    isVariant: string | null;
    count: number;
  }

  interface UseBasket extends Basket {
    user: User;
    basket: Basket[] | null;
    method: string;
    setBasket: Dispatch<SetStateAction<Basket[] | null>>;
  }

  interface Address {
    [key: string]: {
      username: string;
      phone: string;
      region: string;
      country: string;
      address: string;
    }
  }

  interface Card {
    cardname: string;
    lastdigits: string;
    month: string;
    year: string;
    cardnumber: string;
    payment: string;
    securitycode: string;
  }

  interface BriefPayment {
    [key: number]: Omit<Card, "cardnumber" | "payment" | "securitycode">
  }
  interface Payment {
    [key: string]: Card
  }

  interface ProductHistory {
    [key: number]: {
      products: App.Payment;
      address: Address;
      card: Omit<Card, "cardnumber" | "payment" | "securitycode">
      price: string;
    }
  }

  interface Context {
    session?: AuthSession | null;
    user: User | null;
    defaultName: string | null;
    setDefaultName: Dispatch<SetStateAction<string | null>>;
    avatarUrl: string | null;
    setAvatarUrl: Dispatch<SetStateAction<string | null>>;
    basket: Basket[] | null;
    setBasket: Dispatch<SetStateAction<Basket[] | null>>;
    addresses: Address | null;
    setAddresses: Dispatch<SetStateAction<Address | null>>;
    paymentMethods: Payment | null;
    setPaymentMethods: Dispatch<SetStateAction<Payment | null>>;
    productHistory: ProductHistory | null;
    setProductHistory: Dispatch<SetStateAction<ProductHistory | null>>;
    loading: boolean;
    signIn: (options: UserCredentials) => Promise<{
      session: AuthSession | null;
      user: User | null;
      provider?: Provider | undefined;
      url?: string | null | undefined;
      error: Error | null;
      data: AuthSession | null;
    }>;
    signUp: (options: UserCredentials) => Promise<{
      user: User | null;
      session: AuthSession | null;
      error: Error | null;
      data: AuthSession | User | null;
    }>;
    signOut: () => Promise<{
      error: Error | null;
    }>;
  }
}
