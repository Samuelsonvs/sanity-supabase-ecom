import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { User, AuthSession, UserCredentials } from "@supabase/supabase-js";

import { supabase, getAvatarUsername } from "@/utils/supabaseClient";
import { Auth } from "@/interfaces/auth";

export const AuthContext = createContext({} as Auth.AuthContextType);

export function AuthProvider({ children }: Auth.AuthChildren) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<AuthSession | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [defaultName, setDefaultName] = useState<string | null>(null);

  useEffect(() => {
    const session = supabase.auth.session();
    setSession(session);
    setUser(session?.user ?? null);
    (async (session) => {
      if (session) {
        const { url, username, error } = await getAvatarUsername(session);
        if (url && username) {
          setAvatarUrl(url);
          setDefaultName(username)
        }
      }
    })(session);

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        if (session) {
          const { url, username, error } = await getAvatarUsername(session);
          if (url && username) {
            setAvatarUrl(url);
            setDefaultName(username)
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
      defaultName,
      setDefaultName,
      avatarUrl,
      setAvatarUrl,
      signIn: (options: UserCredentials) => supabase.auth.signIn(options),
      signUp: (options: UserCredentials) => supabase.auth.signUp(options),
      signOut: () => {
        setAvatarUrl(null);
        return supabase.auth.signOut();
      },
    }),
    [user, defaultName, session, avatarUrl]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useUser = () => {
  const context = useContext<Auth.AuthContextType>(AuthContext);
  if (context === undefined) {
    throw new Error(`useUser must be used within a UserContextProvider.`);
  }
  return context;
};
