/* eslint-disable react-hooks/exhaustive-deps */
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";

import { useUser } from "@/contexts/AuthContext";
import Container from "@/container/Container";
import { App } from "@/interfaces/app";
import Input from "@/components/Input";
import useFormRef from "@/hooks/useFormRefs";

export const Signin: NextPage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  const { passwordRef, emailRef } = useFormRef();
  const {
    handleSubmit,
    formState: { errors },
  } = useForm<App.FormValues>();
  const { session, signIn } = useUser();
  const router = useRouter();

  const handleLogin: SubmitHandler<App.FormValues> = async () => {
    try {
      setLoading(true);
      if (email && password) {
        const { error } = await signIn({ email, password });
        if (error) throw error;
      }
    } catch (error: any) {
      alert(error.error_description || error.message);
    } finally {
      setLoading(false);
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
                  onSubmit={handleSubmit(handleLogin)}
                  className="card-body"
                >
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Email</span>
                    </label>
                    <Input
                      type={"email"}
                      ref={emailRef.ref}
                      placeholder={"Your email"}
                      onChange={setEmail}
                      onBlur={emailRef.onBlur}
                      name={emailRef.name}
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Password</span>
                    </label>
                    <Input
                      type={"password"}
                      ref={passwordRef.ref}
                      placeholder={"Your password"}
                      onChange={setPassword}
                      onBlur={passwordRef.onBlur}
                      name={passwordRef.name}
                    />
                    {errors.password && (
                      <div className="alert alert-warning mt-2">
                        <div className="flex-1">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            className="w-6 h-6 mx-2 stroke-current"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                            ></path>
                          </svg>
                          <label>Password min 6</label>
                        </div>
                      </div>
                    )}
                    <label className="label">
                      <a
                        href="#"
                        className="label-text-alt text-blue-600 border-b border-blue-400"
                      >
                        Forgot password?
                      </a>
                    </label>
                    <label className="label">
                      <span>
                        <span>New User? </span>
                        <Link passHref href="/signup">
                          <a className="label-text-alt font-semibold text-blue-600 border-b border-blue-400">
                            Create an account.
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

export default Signin;
