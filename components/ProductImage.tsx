import React from "react";
import Link from "next/link";
import Image from "next/image";

import { sanityImage } from "@/utils/sanity";
import { App } from "@/interfaces/app";
import { useUser } from "@/contexts/AuthContext";
import UseBasket from "@/utils/basket";

export const ProductImage = ({
  slug,
  image,
  price,
  title,
  _id,
  width,
  height,
  containerCss,
  hoverCss,
}: App.ImageProduct) => {
  const { user, basket, setBasket } = useUser();
  const sendToBasket = async () => {
    if (user) {
      const { result } = await UseBasket({
        _id,
        isVariant: null,
        count: 1,
        method: 'ADD',
        user,
        basket,
        setBasket,
      });
      if (result) {
        console.log(result);
      }
    }
  };
  return (
    <div
      className={`relative rounded-3xl overflow-hidden border-4 border-transparent bg-origin-border hover:border-yellow-600 ${containerCss}`}
    >
      <Link passHref href={`/product/${slug}`}>
        <a className="flex w-full h-full cursor-pointer">
          <Image
            alt="ss"
            src={sanityImage(image, width, height) || ""}
            loading="lazy"
            title={"ss"}
            className="rounded-2xl"
            height={height}
            width={width}
          />
        </a>
      </Link>
      <div
        className={`absolute w-full h-1/3 text-center text-white bg-black bg-opacity-50 rounded-b-2xl ${hoverCss}`}
      >
        <div className="flex justify-evenly mt-3">
          <div></div>
          <div>{price}$</div>
          <div className="-my-2">
            <button
              onClick={sendToBasket}
              className="btn h-auto min-h-0 bg-yellow-600 hover:bg-yellow-700 p-3 rounded-full"
            >
              <svg
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="0"
                  fill="#fff"
                  d="M6.4 3.2H32L27.2 17.6H6.4C5.97565 17.6 5.56869 17.7686 5.26863 18.0686C4.96857 18.3687 4.8 18.7757 4.8 19.2C4.8 19.6243 4.96857 20.0313 5.26863 20.3314C5.56869 20.6314 5.97565 20.8 6.4 20.8H27.2V24H6.4C5.12696 24 3.90606 23.4943 3.00589 22.5941C2.10571 21.6939 1.6 20.473 1.6 19.2C1.6 17.927 2.10571 16.7061 3.00589 15.8059C3.90606 14.9057 5.12696 14.4 6.4 14.4H6.928L4.8 8L3.2 3.2H0V0H4.8C5.22435 0 5.63131 0.168571 5.93137 0.468629C6.23143 0.768687 6.4 1.17565 6.4 1.6V3.2ZM8 32C7.15131 32 6.33737 31.6629 5.73726 31.0627C5.13714 30.4626 4.8 29.6487 4.8 28.8C4.8 27.9513 5.13714 27.1374 5.73726 26.5373C6.33737 25.9371 7.15131 25.6 8 25.6C8.84869 25.6 9.66263 25.9371 10.2627 26.5373C10.8629 27.1374 11.2 27.9513 11.2 28.8C11.2 29.6487 10.8629 30.4626 10.2627 31.0627C9.66263 31.6629 8.84869 32 8 32ZM24 32C23.1513 32 22.3374 31.6629 21.7373 31.0627C21.1371 30.4626 20.8 29.6487 20.8 28.8C20.8 27.9513 21.1371 27.1374 21.7373 26.5373C22.3374 25.9371 23.1513 25.6 24 25.6C24.8487 25.6 25.6626 25.9371 26.2627 26.5373C26.8629 27.1374 27.2 27.9513 27.2 28.8C27.2 29.6487 26.8629 30.4626 26.2627 31.0627C25.6626 31.6629 24.8487 32 24 32Z"
                />
              </svg>
            </button>
          </div>
        </div>
        <div className="py-3">{title}</div>
      </div>
    </div>
  );
};
