import { AuthSession, createClient, User } from "@supabase/supabase-js";
import { App } from "@/interfaces/app"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "url";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "key";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const setUserProfiles = async (user: User, features: App.Updates) => {
  const { error } = await supabase.from("users").update(
    {
      ...features
    })
    .eq("id", user!.id);
  return { error }
};

export const searchUser = async (user: User | null) => {
  const { data, error, status } = await supabase
    .from("users")
    .select(`username, avatar_url`)
    .eq("id", user!.id)
    .single();
  return { data, error, status };
};

export const getAvatarData = async (path: string) => {
  const { data, error } = await supabase.storage.from("avatars").download(path);
  return { data, error };
};

export const setAvatarData = async (path: string, file: File) => {
  let { error } = await supabase.storage
    .from("avatars")
    .upload(path, file);
  return { error }
}

export const getUserDetails = async (user: User | null) => {
  const { data, error, status } = await searchUser(user);
  const { avatar_url, username } = data;
  if (avatar_url) {
    const { data, error } = await getAvatarData(avatar_url);
    const url = URL.createObjectURL(data);
    if (url && username) {
      return { url, username}
    };
    return { error };
  }
  if (username) {
    return { username }
  }

  return { error };
};


// export const deleteUser = async (session: AuthSession) => {
//   const { user, error } = await supabase.auth.api.deleteUser(
//     session.user!.id,
//     'YOUR_SERVICE_ROLE_KEY'
//   )
// } 