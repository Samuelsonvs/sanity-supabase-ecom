/* eslint-disable react-hooks/exhaustive-deps */
import type { NextPage } from "next";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { SubmitHandler } from "react-hook-form";

import { useUser } from "@/contexts/AuthContext";
import { setUserProfiles } from "@/utils/supabaseClient";
import Container from "@/container/Container";
import Input from "@/components/Input";
import { App } from "@/interfaces/app";
import ErrorSVG from "@/public/static/svg/error.svg";
import { signUpSchema } from "@/utils/formValidations";
import useFormRef from "@/hooks/useFormRefs";

export const Signup: NextPage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [registerName, setRegisterName] = useState<string | null>(null);
  const { session, signUp } = useUser();
  const { register, handleSubmit, errors } = useFormRef(signUpSchema);
  const router = useRouter();

  const handleRegister: SubmitHandler<App.FormValues> = async (data) => {
    const { email, password, username } = data;

    const { error, user } = await signUp({ email: email!, password: password! });
    if (error) {
      return alert(error.message);
    } else {
      if (user) {
        const { error } = await setUserProfiles(user, {
          username: username!
        });
      }
    }
    
  };

  useEffect(() => {
    if (session) {
      router.replace("/");
    }
  }, [session]);
  return (
    <>
      {!session && (
        <Container>
          <div className="hero min-h-screen bg-base-200">
            <div className="flex-col justify-center hero-content lg:flex-row">
              <div className="text-center lg:text-left">
                <h1 className="mb-5 text-5xl font-bold">Hello there</h1>
                <p className="mb-5">
                  Provident cupiditate voluptatem et in. Quaerat fugiat ut
                  assumenda excepturi exercitationem quasi. In deleniti eaque
                  aut repudiandae et a id nisi.
                </p>
              </div>
              <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                <form
                  onSubmit={handleSubmit((data) => handleRegister(data))}
                  className="custom-card"
                >
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Username</span>
                    </label>
                    <Input
                      type={"text"}
                      placeholder={"username"}
                      name={"username"}
                      registerRef={register}
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Email</span>
                    </label>
                    <Input
                      type={"email"}
                      placeholder={"email"}
                      name={"email"}
                      registerRef={register}
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Password</span>
                    </label>
                    <Input
                      type={"password"}
                      placeholder={"password"}
                      name={"password"}
                      registerRef={register}
                    />
                    {errors.password && (
                      <div className="alert alert-warning mt-2">
                        <div className="flex-1">
                          <ErrorSVG className="w-6 h-6 mx-2" />
                          <label>Password min 6</label>
                        </div>
                      </div>
                    )}
                    <label className="label">
                      <span>
                        <span>Already a member? </span>
                        <Link passHref href="/signin">
                          <a className="label-text-alt font-semibold text-blue-600 border-b border-blue-400">
                            Sign in.
                          </a>
                        </Link>
                      </span>
                    </label>
                  </div>
                  <div className="form-control mt-6">
                    <input
                      disabled={loading}
                      className="btn btn-primary bg-yellow-600 border-yellow-600 hover:bg-yellow-600 hover:border-yellow-600"
                      type="submit"
                    />
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

export default Signup;
