import { Dispatch, SetStateAction } from "react";
import {
  User,
  AuthSession,
  UserCredentials,
  Provider,
} from "@supabase/supabase-js";

namespace Auth {
  interface AuthChildren {
    children: JSX.Element;
  }

  interface Basket {
      _id: string,
      isVariant: string | null,
      count: number 
  }

  interface AuthContextType {
    session?: AuthSession | null;
    user: User | null;
    defaultName: string | null;
    setDefaultName: Dispatch<SetStateAction<string | null>>;
    avatarUrl: string | null;
    setAvatarUrl: Dispatch<SetStateAction<string | null>>;
    basket: Basket[] | null;
    setBasket: Dispatch<SetStateAction<Basket[] | null>>;
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
