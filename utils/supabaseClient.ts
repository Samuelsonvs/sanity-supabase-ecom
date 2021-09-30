import { AuthSession, createClient, User } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "url";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "key";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const insertUserInProfiles = async (user: User, name: string) => {
  await supabase.from("profiles").upsert(
    {
      id: user!.id,
      username: name,
      avatar_url: "0.761417900981517.png",
      updated_at: new Date(),
    },
    { returning: "minimal" }
  );
};

export const isUserInDB = async (name: string) => {
  const { data } = await supabase
    .from("profiles")
    .select("username")
    .eq("username", name)
    .single();
  return { data };
};

export const profilesInfo = async (session: AuthSession) => {
  const { data, error, status } = await supabase
    .from("profiles")
    .select(`username,avatar_url`)
    .eq("id", session?.user!.id)
    .single();
  return { data, error, status };
};

export const avatarData = async (path: string) => {
  const { data, error } = await supabase.storage.from("avatars").download(path);
  return { data, error };
};

export const getAvatarUsername = async (session: AuthSession) => {
  const { data, error, status } = await profilesInfo(session);

  const { avatar_url, username } = data;
  if (avatar_url) {
    const { data, error } = await avatarData(avatar_url);
    const url = URL.createObjectURL(data);
    if (url && username) {
      return { url, username}
    };
    return { error };
  }

  return { error };
};
