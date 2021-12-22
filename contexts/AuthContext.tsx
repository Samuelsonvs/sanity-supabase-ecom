/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { User, AuthSession, UserCredentials } from "@supabase/supabase-js";

import { supabase, getUserDetails } from "@/utils/supabaseClient";
import { Auth } from "@/interfaces/auth";
import useCookie from "@/hooks/useCookie";

export const AuthContext = createContext({} as Auth.Context);

export function AuthProvider({ children }: Auth.Children) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<AuthSession | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [defaultName, setDefaultName] = useState<string | null>(null);
  const [basket, setBasket] = useState<Auth.Basket[] | null>(null);
  const [addresses, setAddresses] = useState<Auth.Address | null>(null);
  const [paymentMethods, setPaymentMethods] = useState<Auth.Payment | null>(null);
  const [productHistory, setProductHistory] = useState<Auth.ProductHistory | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [mounted, setMounted] = useState<boolean>(false);
  const { setCookie, removeCookie } = useCookie(session!)

  useEffect(() => {

      setLoading(true);
      const session = supabase.auth.session();
      setSession(session);
      setUser(session?.user ?? null);
      const { data: authListener } = supabase.auth.onAuthStateChange(
        async (event, session) => {
          setSession(session);
          setUser(session?.user ?? null);
          setDefaultName(null);
          setBasket(null);
          setAvatarUrl(null);
          setAddresses(null);
          setPaymentMethods(null);
          setProductHistory(null);
          removeCookie();
        }
      );

      return () => {
        authListener?.unsubscribe();
      };
  }, []);

  useEffect(() => {
    if (user) {
      (async () => {
        await Promise.resolve(
          getUserDetails(user).then((results) => {
            const { url, username, basket, address, payment_method, product_history } = results;
            setAvatarUrl(url ?? null);
            setDefaultName(username);
            setBasket(basket);
            setAddresses(address);
            setPaymentMethods(payment_method);
            setProductHistory(product_history);
            setCookie();
          })
        );
        setLoading(false);
      })();
    }
  }, [user]);

  useEffect(() => setMounted(true), []);

  const value = useMemo(
    () => ({
      session,
      user,
      defaultName,
      setDefaultName,
      avatarUrl,
      setAvatarUrl,
      basket,
      setBasket,
      addresses,
      setAddresses,
      paymentMethods,
      setPaymentMethods,
      productHistory,
      setProductHistory,
      loading,
      signIn: (options: UserCredentials) => supabase.auth.signIn(options),
      signUp: (options: UserCredentials) => supabase.auth.signUp(options),
      signOut: () => {
        setAvatarUrl(null);
        return supabase.auth.signOut();
      },
    }),
    [user, defaultName, session, avatarUrl, basket, addresses, paymentMethods, loading, productHistory]
  );
  
   
  return (
    <>
      {mounted && (
      <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
      )}
    </>
  ) 
   
}

export const useUser = () => {
  const context = useContext<Auth.Context>(AuthContext);
  if (context === undefined) {
    throw new Error(`useUser must be used within a UserContextProvider.`);
  }
  return context;
};
