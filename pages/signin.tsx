/* eslint-disable react-hooks/exhaustive-deps */
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { SubmitHandler } from "react-hook-form";

import { useUser } from "@/contexts/AuthContext";
import Container from "@/container/Container";
import { App } from "@/interfaces/app";
import Input from "@/components/Input";
import { signInSchema } from "@/utils/formValidations";
import useFormRef from "@/hooks/useFormRefs";

export const Signin: NextPage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { register, handleSubmit, errors } = useFormRef(signInSchema);
  const { session, signIn } = useUser();
  const router = useRouter();

  const handleLogin: SubmitHandler<App.FormValues> = async (data) => {
    const { email, password } = data;
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
                  onSubmit={handleSubmit((data) => handleLogin(data))}
                  className="custom-card"
                >
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Email</span>
                    </label>
                    <Input
                      type={"email"}
                      placeholder={"email"}
                      name={"email"}
                      registerRef={register}
                      errors={errors.email}
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
                      errors={errors.password}
                    />
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
