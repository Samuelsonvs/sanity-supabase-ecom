import type { NextPage } from "next";
import { useState } from "react";
import { useRouter } from "next/router";
import { useForm, SubmitHandler } from "react-hook-form";

import { setUserProfiles, setAvatarData } from "@/utils/supabaseClient";
import Avatar from "@/components/Avatar";
import { useUser } from "@/contexts/AuthContext";
import Container from "@/container/Container";
import { App } from "@/interfaces/app";
import Input from "@/components/Input";
import useFormRef from "@/hooks/useFormRefs";

export const Account: NextPage = () => {
  const { session, user, setAvatarUrl, defaultName, setDefaultName } =
    useUser();
  const [loading, setLoading] = useState<boolean>(false);
  const [username, setUsername] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [tempAvatarUrl, setTempAvatarUrl] = useState<string | null>(null);
  const [avatarPath, setAvatarPath] = useState<App.Path | null>(null);
  const { passwordRef, emailRef, usernameRef } = useFormRef();
  const {
    handleSubmit,
    formState: { errors },
  } = useForm<App.FormValues>();
  const router = useRouter();
  const handleUpdate: SubmitHandler<App.FormValues> = async () => {
    try {
      setLoading(true);

      let updates;

      if (avatarPath) {
        const { filePath, file } = avatarPath;
        const { error } = await setAvatarData(filePath, file);

        if (error) throw error;

        updates = {
          username: username ?? defaultName,
          avatar_url: filePath,
        };

        setAvatarUrl(tempAvatarUrl);
      } else {
        updates = {
          username: username ?? defaultName,
        };
      }

      if (user) {
        const { error } = await setUserProfiles(user, updates);
        if (error) {
          throw error;
        } else {
          setDefaultName(username);
        }
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
              <div className="custom-card">
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
                  className="custom-card"
                >
                  <div className="form-control sm:w-96">
                    <label className="label">
                      <span className="label-text">Username</span>
                    </label>
                    <Input
                      type={"text"}
                      ref={usernameRef.ref}
                      placeholder={"Your username"}
                      defaultValue={defaultName ?? ""}
                      onChange={setUsername}
                      onBlur={usernameRef.onBlur}
                      name={usernameRef.name}
                    />
                  </div>
                  <div className="form-control sm:w-96">
                    <label className="label">
                      <span className="label-text">Password</span>
                    </label>
                    <Input
                      type={"password"}
                      ref={passwordRef.ref}
                      placeholder={"Your password"}
                      onBlur={passwordRef.onBlur}
                      defaultValue="**********"
                      disabled={true}
                      name={passwordRef.name}
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
                    <Input
                      type={"email"}
                      ref={emailRef.ref}
                      placeholder={"Your email"}
                      onBlur={emailRef.onBlur}
                      defaultValue={user?.email}
                      disabled={true}
                      name={emailRef.name}
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
