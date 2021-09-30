/* eslint-disable react-hooks/exhaustive-deps */
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useForm, SubmitHandler } from "react-hook-form";

import { useUser } from "@/contexts/AuthContext";
import { insertUserInProfiles, isUserInDB } from "@/utils/supabaseClient";
import Container from "@/container/Container";
import { App } from "@/interfaces/app";

export const Signup: NextPage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<App.FormSignupValues>();
  const { session, signUp } = useUser();
  const router = useRouter();

  const handleRegister: SubmitHandler<App.FormSignupValues> = async () => {
    const { data } = await isUserInDB(name);
    if (data) {
      return alert("Pls chance username!");
    } else {
      try {
        setLoading(true);
        const { user, error } = await signUp({ email, password });
        if (error) {
          throw error;
        } else {
          if (user) {
            await insertUserInProfiles(user, name);
          } else {
            console.log("error name");
          }
        }
        alert("Check your email for the login link!");
      } catch (error: any) {
        alert(error.error_description || error.message);
      } finally {
        setLoading(false);
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
                  onSubmit={handleSubmit(handleRegister)}
                  className="card-body"
                >
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Username</span>
                    </label>
                    <input
                      className="input input-bordered"
                      type="text"
                      placeholder="Your username"
                      {...register("username", {
                        required: true,
                        maxLength: 80,
                      })}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Email</span>
                    </label>
                    <input
                      className="input input-bordered"
                      type="email"
                      placeholder="Your email"
                      {...register("email", {
                        required: true,
                        pattern: /^\S+@\S+$/i,
                      })}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Password</span>
                    </label>
                    <input
                      className="input input-bordered"
                      type="password"
                      placeholder="Your password"
                      {...register("password", {
                        required: true,
                        minLength: 6,
                      })}
                      onChange={(e) => setPassword(e.target.value)}
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
