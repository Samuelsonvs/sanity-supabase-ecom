/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { User, AuthSession, UserCredentials } from "@supabase/supabase-js";

import { supabase, getUserDetails } from "@/utils/supabaseClient";
import { Auth } from "@/interfaces/auth";

export const AuthContext = createContext({} as Auth.Context);

export function AuthProvider({ children }: Auth.Children) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<AuthSession | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [defaultName, setDefaultName] = useState<string | null>(null);
  const [basket, setBasket] = useState<Auth.Basket[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    setLoading(true);
    const session = supabase.auth.session();
    setSession(session);
    setUser(session?.user ?? null);
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
      }
    );

    return () => {
      authListener?.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (user) {
      Promise.resolve(
        getUserDetails(user).then((results) => {
          const { url, username, basket } = results;
          setAvatarUrl(url ?? null);
          setDefaultName(username);
          setBasket(basket)
        })
      );
      setLoading(false);
    }
  }, [user]);

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
      loading,
      signIn: (options: UserCredentials) => supabase.auth.signIn(options),
      signUp: (options: UserCredentials) => supabase.auth.signUp(options),
      signOut: () => {
        setAvatarUrl(null);
        return supabase.auth.signOut();
      },
    }),
    [user, defaultName, session, avatarUrl, basket]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useUser = () => {
  const context = useContext<Auth.Context>(AuthContext);
  if (context === undefined) {
    throw new Error(`useUser must be used within a UserContextProvider.`);
  }
  return context;
};
