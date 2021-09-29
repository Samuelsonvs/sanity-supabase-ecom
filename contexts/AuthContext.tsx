import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { User, AuthSession, UserCredentials } from "@supabase/supabase-js";

import { supabase, getAvatarUrl } from "@/utils/supabaseClient";
import { AuthContextType, AuthChildren } from "@/interfaces/interface";

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: AuthChildren) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<AuthSession | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  useEffect(() => {
    const session = supabase.auth.session();
    setSession(session);
    setUser(session?.user ?? null);
    (async (session) => {
      if (session) {
        const { url, error } = await getAvatarUrl(session);
        if (url) {
          setAvatarUrl(url);
        }
      }
    })(session);

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        if (session) {
          const { url, error } = await getAvatarUrl(session);
          if (url) {
            setAvatarUrl(url);
          }
        }
      }
    );

    return () => {
      authListener?.unsubscribe();
    };
  }, []);

  const value = useMemo(
    () => ({
      session,
      user,
      avatarUrl,
      setAvatarUrl,
      signIn: (options: UserCredentials) => supabase.auth.signIn(options),
      signUp: (options: UserCredentials) => supabase.auth.signUp(options),
      signOut: () => {
        setAvatarUrl(null);
        return supabase.auth.signOut();
      },
    }),
    [user, session, avatarUrl]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useUser = () => {
  const context = useContext<AuthContextType>(AuthContext);
  if (context === undefined) {
    throw new Error(`useUser must be used within a UserContextProvider.`);
  }
  return context;
};
