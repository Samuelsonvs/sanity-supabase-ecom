import { createClient, User } from "@supabase/supabase-js";

import { App } from "@/interfaces/app";
import { Auth } from "@/interfaces/auth";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "url";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "key";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const setUserProfiles = async (user: User, features: App.Updates) => {
  const { error } = await supabase
    .from("users")
    .update({
      ...features,
    })
    .eq("id", user!.id);
  return { error };
};

export const setUserBasket = async (
  user: User,
  basket: Auth.Basket[] | null
) => {
  const { error } = await supabase
    .from("users")
    .update({
      basket,
    })
    .eq("id", user!.id);
  return { error };
};

export const searchUser = async (user: User | null) => {
  const { data, error, status } = await supabase
    .from("users")
    .select(`username, avatar_url, basket, address, payment_method, product_history`)
    .eq("id", user!.id)
    .single();
  return { data, error, status };
};

export const getAvatarData = async (path: string) => {
  const { data, error } = await supabase.storage.from("avatars").download(path);
  return { data, error };
};

export const setAvatarData = async (path: string, file: File) => {
  let { error } = await supabase.storage.from("avatars").upload(path, file);
  return { error };
};

export const getUserDetails = async (user: User | null) => {
  const { data, error, status } = await searchUser(user);
  const { avatar_url, username, basket, address, payment_method, product_history } = data;
  if (avatar_url) {
    const { data, error } = await getAvatarData(avatar_url);
    const url = URL.createObjectURL(data!);
    if (url && username) {
      return { url, username, basket, address, payment_method, product_history };
    }
    return { error };
  }
  if (username) {
    return { username, basket, address, payment_method, product_history };
  }

  return { error };
};

export const setAddressTable = async (user: User, address: Auth.Address) => {
  const { error } = await supabase
    .from("users")
    .update({
      address,
    })
    .eq("id", user!.id);
  return { error };
};

export const allCards = async (id: string) => {
  const { error, data } = await supabase
    .from("users")
    .select(`payment_method`)
    .eq("id", id)
    .single();
  return { data, error };
};

export const updateCards = async (payment_method: Auth.Payment, id: string) => {
  const { data, error } = await allCards(id)
  if (data) {
    const {data, error} = await supabase
      .from("users")
      .update({
        payment_method
      })
      .eq("id", id) 
    return { data, error };
    
  } else {
    return { data, error }
  }
};

export const updateProductHistory = async (product_history: Auth.ProductHistory, id: string) => {
  const {data, error} = await supabase
    .from("users")
    .update({
      product_history
    })
    .eq("id", id)
  return { data, error };
};


export const setPayment = async (user: User, payment_method: Auth.Payment) => {
  const { error } = await supabase
    .from("users")
    .update({
      payment_method
    })
    .eq("id", user!.id);
  return { error };
};

// export const deleteUser = async (session: AuthSession) => {
//   const { user, error } = await supabase.auth.api.deleteUser(
//     session.user!.id,
//     'YOUR_SERVICE_ROLE_KEY'
//   )
// }
