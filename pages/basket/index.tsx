/* eslint-disable react-hooks/exhaustive-deps */
import React, { MouseEvent, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import Container from "@/container/Container";
import { useUser } from "@/contexts/AuthContext";
import { GroqData } from "@/interfaces/groqData";
import { Steps } from "@/components/Steps";
import { productSolver } from "@/utils/groqResolver";
import QtyHandler from "@/components/QtyHandler";
import UseBasket from "@/utils/basket";
import { sanityImage } from "@/utils/sanity";
import { BasketSVG, XSVG } from "@/lib/svg";

export const Index = () => {
  const { session, user, basket, setBasket, loading } = useUser();
  const [data, setData] = useState<GroqData.Products | null>(null);
  const dataLen = Array.isArray(data) && data.length;
  const [basketIdCountObj, setBasketCountObj] = useState<any | null>(null);
  const totalPrice =
    Array.isArray(data) &&
    basket &&
    data?.reduce(
      (acc: any, cur: any) =>
        acc +
        cur.defaultProductVariant.price *
          (basketIdCountObj[cur._id] ? basketIdCountObj[cur._id][0] : 1),
      0
    );
  const handleQty = async (
    qtyParam: number,
    _id?: string,
    isVariant?: string | null
  ) => {
    try {
      if (user && _id) {
        const { result } = await UseBasket({
          _id,
          isVariant: isVariant ?? null,
          count: qtyParam,
          method: "UPDATE",
          user,
          basket,
          setBasket,
        });
        if (result) {
          console.log(result);
        }
      }
    } catch (error: any) {
      alert(error.error_description || error.message);
    }
  };

  const removeHandler = async (
    e: MouseEvent<HTMLButtonElement | MouseEvent>,
    _id: string,
    count: number,
    isVariant: string | null
  ) => {
    if (user) {
      const { result } = await UseBasket({
        _id,
        count,
        isVariant,
        method: "REMOVE",
        user,
        basket,
        setBasket,
      });
      if (result) {
        console.log(result);
      } else {
        (e.target as HTMLButtonElement).classList.add("hidden");
      }
    }
  };

  useEffect(() => {
    if (session && basket) {
      (async () => {
        const response = await fetch("/api/basket", {
          body: JSON.stringify({
            body: basket,
          }),
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
        });
        const json = await response.json();
        setData(json.products);
      })();
      setBasketCountObj(
        basket?.reduce(
          (list, product) => ({
            ...list,
            [product._id]: [product.count, product.isVariant],
          }),
          {}
        )
      );
    }
  }, [session, basket]);

  return (
    <Container>
      {!loading ? (
        <div className="mt-20 p-3 sm:p-10 max-w-4xl mx-auto">
          <div>
            <Steps step={["Basket"]} />
          </div>
          {basket ? (
            <div className="mt-10 shadow-2xl py-2">
              <div className="px-1 sm:pl-36 md:px-1">
                {data &&
                  Array.isArray(data) &&
                  data.map((product: any, idx) => {
                    const {
                      blurb,
                      body,
                      category,
                      Color,
                      colors,
                      images,
                      price,
                      qty,
                      title,
                      variants,
                      slug,
                      _id,
                    } = productSolver(product);
                    const currenBasketItems =
                      basketIdCountObj &&
                      basketIdCountObj[_id as keyof typeof basketIdCountObj];
                    const exactSlug = `/product/${slug}`;
                    return (
                      <div
                        key={idx}
                        className={`flex flex-col items-center sm:items-start space-y-3 md:space-y-0 md:flex-row md:items-center justify-between p-1 ${
                          dataLen !== idx + 1 && "border-b pb-5"
                        } ${idx !== 0 && "pt-5"}`}
                      >
                        <div className="flex flex-col items-center sm:flex-row space-x-3 space-y-3 sm:space-y-0">
                          <Link passHref href={exactSlug}>
                            <Image
                              alt="ss"
                              src={sanityImage(images[0], 170, 120) || ""}
                              loading="lazy"
                              title={"ss"}
                              className="rounded-xl cursor-pointer"
                              height={120}
                              width={170}
                            />
                          </Link>
                          <Link passHref href={exactSlug}>
                            <a className="w-40 leading-5 text-sm hover:underline">
                              {title}
                            </a>
                          </Link>
                          <p
                            className="my-auto w-4 h-4 rounded-full"
                            style={{ backgroundColor: `${Color.hex}` }}
                          ></p>
                        </div>
                        {currenBasketItems && (
                          <QtyHandler
                            setter={handleQty}
                            inputQty={Number(currenBasketItems[0])}
                            qty={qty}
                            min={1}
                            _id={_id}
                            isVariant={currenBasketItems[1]}
                            max={qty}
                            step={1}
                            css={"w-8"}
                            containerCss={"mt-2 md:mt-0 border-2"}
                          />
                        )}
                        <div>
                          {currenBasketItems &&
                            Number(currenBasketItems[0] * Number(price))}
                          $
                        </div>
                        <button
                          onClick={(e) => removeHandler(e, _id, 1, null)}
                          className="btn btn-sm leading-4"
                        >
                          <XSVG
                          customClass={"w-5 h-5 mr-2"}
                          />
                          Delete
                        </button>
                      </div>
                    );
                  })}
                <div className="mt-10 flex justify-center items-center sm:justify-between">
                  <Link passHref href="/basket/payment">
                    <a className="flex space-x-1 btn btn-primary rounded-xl px-5 border-yellow-600 hover:border-yellow-700 bg-yellow-600 hover:bg-yellow-700">
                    <BasketSVG
                      customClass={"w-4 h-4"}
                      fill={"white"}
                      stroke={"0"}
                      />
                      <span>Checkout</span>
                    </a>
                  </Link>
                  <div className="pr-0 sm:pr-20 md:pr-36">
                    <span className="px-4">Total :</span>
                    <span>{totalPrice && totalPrice.toFixed(2)}$</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div>There are no products in your cart.</div>
          )}
        </div>
      ) : (
        <div className="mt-20">Pls wait...</div>
      )}
    </Container>
  );
};

export default Index;
