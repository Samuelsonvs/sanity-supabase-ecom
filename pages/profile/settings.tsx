import type { NextPage } from "next";
import { useState } from "react";
import { useRouter } from "next/router";
import { useForm, SubmitHandler } from "react-hook-form";

import { supabase } from "@/utils/supabaseClient";
import Avatar from "@/components/Avatar";
import { useUser } from "@/contexts/AuthContext";
import Container from "@/container/Container";

interface FormSettingValues {
  username: string | null;
  avatar_url: string | null;
  email: string | null;
  password: string;
}

export const Account: NextPage = () => {
  const { session, user, setAvatarUrl, name, setName } = useUser();
  const [loading, setLoading] = useState<boolean>(false);
  const [username, setUsername] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [tempAvatarUrl, setTempAvatarUrl] = useState<string| null>(null);
  const [avatarPath, setAvatarPath] = useState<string| null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormSettingValues>();
  const router = useRouter();

  const handleUpdate: SubmitHandler<FormSettingValues> = async () => {
    try {
      setLoading(true);

      let updates;

      if (avatarPath) {
        updates = {
          id: session?.user!.id,
          username: username ?? name,
          avatar_url: avatarPath,
          updated_at: new Date(),
        };
      } else {
        updates = {
          id: session?.user!.id,
          username: username ?? name,
          updated_at: new Date(),
        };
      }

      if (tempAvatarUrl) {
        setAvatarUrl(tempAvatarUrl)
      }

      let { error } = await supabase.from("profiles").upsert(updates, {
        returning: "minimal", // Don't return the value after inserting
      });

      if (error) {
        throw error;
      } else {
        setName(username)
      }
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      {session && (
        <Container>
          <div className="mt-20 p-10 max-w-3xl mx-auto">
            <h1 className="text-4xl font-semibold"> Account Settings </h1>
            <div className="py-5 mt-5 flex flex-col md:flex-row-reverse justify-center shadow-2xl">
              <div className="card-body">
                <Avatar
                  size={150}
                  tempAvatarSetter={setTempAvatarUrl}
                  avatarPathSetter={setAvatarPath}
                  tempAvatar={tempAvatarUrl}
                />
              </div>
              <div>
                <form
                  onSubmit={handleSubmit(handleUpdate)}
                  className="card-body"
                >
                  <div className="form-control sm:w-96">
                    <label className="label">
                      <span className="label-text">Username</span>
                    </label>
                    <input
                      className="input input-bordered"
                      type="text"
                      placeholder="Your name"
                      defaultValue={name ?? ''}
                      {...register("username", {
                        required: true,
                      })}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                  <div className="form-control sm:w-96">
                    <label className="label">
                      <span className="label-text">Password</span>
                    </label>
                    <input
                      className="input input-bordered"
                      type="password"
                      placeholder="Your password"
                      defaultValue="**********"
                      disabled
                      {...register("password")}
                    />
                    <label className="label">
                      <a
                        href="#"
                        className="label-text-alt text-blue-600 border-b border-blue-400"
                      >
                        Chance password?
                      </a>
                    </label>
                  </div>
                  <div className="form-control sm:w-96">
                    <label className="label">
                      <span className="label-text">Email</span>
                    </label>
                    <input
                      className="input input-bordered"
                      type="email"
                      placeholder="Your email"
                      defaultValue={user?.email}
                      disabled
                      {...register("email")}
                    />
                    <label className="label">
                      <a
                        href="#"
                        className="label-text-alt text-blue-600 border-b border-blue-400"
                      >
                        Chance email?
                      </a>
                    </label>
                  </div>
                  <div className="form-control mt-10">
                    <a href="#" className="text-gray-500 font-semibold">
                      Delete Your Account
                    </a>
                    <div className="text-gray-500 mt-3">
                      <p>You will receive an email to confirm your decision</p>
                      <p>
                        Please note, that all boards you have created will be
                        permanently erased.
                      </p>
                    </div>
                  </div>
                  <div className="form-control flex-row justify-evenly mt-6">
                    <input
                      disabled={loading}
                      className="btn w-20 bg-yellow-600 hover:bg-yellow-600 border-none"
                      type="submit"
                      value="save"
                    />
                    <button
                      onClick={() => router.reload()}
                      disabled={loading}
                      className="btn bg-yellow-600 hover:bg-yellow-600"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </Container>
      )}
    </>
  );
};

export default Account;
