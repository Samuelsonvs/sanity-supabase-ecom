import React from "react";
import { SubmitHandler } from "react-hook-form";
import Image from "next/image";
import Link from "next/link";

import { App } from "@/interfaces/app";
import Input from "@/components/Input";
import useFormRef from "@/hooks/useFormRefs";
import { footerSchema } from "@/utils/formValidations";
import InstagramSVG from "@/public/static/svg/instagram.svg";
import FacebookSVG from "@/public/static/svg/facebook.svg";
import TwitterSVG from "@/public/static/svg/twitter.svg";

export const Footer = () => {
  const { register, handleSubmit, errors } = useFormRef(footerSchema);

  const handleLogin: SubmitHandler<App.FormValues> = async (data) => {
    console.log(data);
    // try {
    //   setLoading(true);
    //   const { error } = await signIn({ email, password });
    //   if (error) throw error;
    // } catch (error: any) {
    //   alert(error.error_description || error.message);
    // } finally {
    //   setLoading(false);
    // }
  };
  return (
    <>
      <div className="prose-lg bg-primary">
        <div className="py-3 grid grid-cols-1 sm:grid-cols-2 w-full border-b-2 border-white">
          <div className="card uppercase">
            <form
              onSubmit={handleSubmit((data) => handleLogin(data))}
              className="h-full"
            >
              <div className="flex flex-col justify-evenly place-items-center lg:flex-row p-5 h-full">
                <label className="label flex-nowrap">
                  <span className="text-lg text-tertiary">
                    Subscribe to our newsletter
                  </span>
                </label>
                <div className="relative w-60 md:w-72 lg:w-80">
                  <Input
                    type={"email"}
                    className={"w-full rounded-full text-tertiary bg-input"}
                    placeholder={"email"}
                    name={"email"}
                    registerRef={register}
                    errors={errors.email}
                  />
                  <button type="button" className="absolute top-0 right-0 rounded-l-none rounded-r-full btn bg-gray-600">
                    send
                  </button>
                </div>
              </div>
            </form>
          </div>
          <div className="card flex-col lg:flex-row lg:justify-evenly place-items-center p-5 border-l-0 sm:border-l-2 border-gray-200 text-tertiary rounded-none">
            <div className="uppercase">Join us on</div>
            <div>
              <ul className="flex space-x-4 justify-center">
                <li>
                  <InstagramSVG />
                </li>
                <li>
                  <TwitterSVG />
                </li>
                <li>
                  <FacebookSVG />
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row space-y-8 md:space-y-0 items-center justify-evenly py-10 text-tertiary">
          <div>Terms & Codition Policy</div>
          <div className="pl-0 md:pl-24">
            <Link passHref href="/">
              <a className="flex">
                <Image
                  src="/static/images/footer/footericon.png"
                  width="112"
                  height="99"
                  alt="nav-icon"
                ></Image>
              </a>
            </Link>
          </div>
          <div>© 2021 Bamboo All Rights Reserved</div>
        </div>
      </div>
    </>
  );
};

export default Footer;
