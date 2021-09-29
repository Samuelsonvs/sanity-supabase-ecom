import { Dispatch, SetStateAction } from "react";

import {
  User,
  AuthSession,
  UserCredentials,
  Provider,
} from "@supabase/supabase-js";

export interface AuthChildren {
  children: JSX.Element;
}

export interface ContainerProps extends AuthChildren {
  customTitle?: string;
}

export interface AuthContextType {
  session?: AuthSession | null;
  user: User | null;
  avatarUrl: string | null;
  setAvatarUrl: Dispatch<SetStateAction<string | null>>;
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

export interface AvatarTypes {
  url: string | null;
  size: number;
  onUpload: (filePath: string) => void;
}

export interface FormSigninValues {
  email: string;
  password: string;
}

export interface FormSignupValues extends FormSigninValues {
  username: string;
}

interface Variant {
  colors: [[string]];
  images: {
    [key: string]: {
      asset: {
        _ref: string;
      };
      _key: string;
    };
  };
  price: number;
  qty: number;
  sizes: [[string]];
}

interface Body {
    en: {
      [key: string]: {
        children: {
          [key: string]: {
            text: string;
          };
        };
      };
    };
}

interface Categories {
  [key: string]: {
    _key: string;
    _ref: string;
  };
}

export interface SanityProduct {
  products: {
    [key: number]: {
      blurb: {
        en: string | null;
      };
      body: Body;
      categories: Categories;
      defaultProductVariant: Variant;
      slug: {
        current: string;
      };
      tags: [[string]] | null;
      category: string | null;
      variants: Variant | null;
    };
    length: number;
  };
}
