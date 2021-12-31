import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

import { sanityImage } from "@/utils/sanity";
import { App } from "@/interfaces/app";
import { useUser } from "@/contexts/AuthContext";
import UseBasket from "@/utils/basket";
import BasketSVG from "@/public/static/svg/basketButton.svg";
import Modal from "./Modal";

export const ProductImage = ({
  slug,
  image,
  price,
  qty,
  title,
  _id,
  width,
  height,
  containerCss,
  hoverCss,
}: App.ImageProduct) => {
  const { user, basket, setBasket } = useUser();
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter();
  const sendToBasket = async () => {
    if (user) {
      const { result } = await UseBasket({
        _id,
        isVariant: null,
        count: 1,
        method: "ADD",
        user,
        basket,
        setBasket,
      });
      if (result) {
        console.log(result);
      } else {
        setIsOpen(true)
      }
    }
  };

  const basketRouter = () => {
    router.replace('/basket')
  }
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
              disabled={qty === 0 && true}
              type="button"
              title="Add basket"
              onClick={sendToBasket}
              className="btn h-auto min-h-0 bg-yellow-600 hover:bg-yellow-700 p-3 rounded-full"
            >
              <BasketSVG className="w-5 h-5" />
            </button>
          </div>
          <Modal
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            firstButtonMessage={'Keep on Shopping'}
            secondButtonMessage={'Go to Basket'}
            dialogTitleMessage={'Successfully'}
            dialogMessage={'What do you want'}
            handler={basketRouter}
          />
        </div>
        <div className="py-3">{title}</div>
      </div>
    </div>
  );
};
