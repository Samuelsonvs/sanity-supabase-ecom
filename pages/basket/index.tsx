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

export const Index = () => {
  const { session, user, basket, setBasket, loading } = useUser();
  const [data, setData] = useState<GroqData.Products | null>(null);
  const dataLen = Array.isArray(data) && data.length
  const [basketIdCountObj, setBasketCountObj] = useState<any | null>(null);
  const totalPrice = Array.isArray(data) && basket && data?.reduce((acc:any, cur:any) => acc + cur.defaultProductVariant.price * (basketIdCountObj[cur._id] ? basketIdCountObj[cur._id][0] : 1), 0);
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
                    const exactSlug = `/product/${slug}`
                    return (
                      <div key={idx} className={`flex flex-col items-center sm:items-start space-y-3 md:space-y-0 md:flex-row md:items-center justify-between p-1 ${dataLen !==idx +1 && "border-b pb-5"} ${idx !== 0 && "pt-5"}`}>
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
                            <a className="w-40 leading-5 text-sm hover:underline">{title}</a>
                          </Link>
                          <p className="my-auto w-4 h-4 rounded-full" style={{ backgroundColor: `${Color.hex}` }}></p>
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
                        <div>{currenBasketItems && Number(currenBasketItems[0] * Number(price))}$</div>
                        <button onClick={(e) => removeHandler(e, _id, 1, null)} className="btn btn-sm leading-4">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-4 h-4 mr-2 stroke-current">   
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>                       
                          </svg>
                          Delete
                        </button> 
                      </div>
                    );
                  })}
                  <div className="mt-10 flex justify-center items-center sm:justify-between">
                    <button className="flex space-x-1 btn btn-primary rounded-xl px-5 bg-yellow-600 hover:bg-yellow-700">
                      
                      <svg
                        viewBox="0 0 32 32"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="inline-block w-5 h-5 sm:w-6 sm:h-6 stroke-current"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M6.4 3.2H32L27.2 17.6H6.4C5.97565 17.6 5.56869 17.7686 5.26863 18.0686C4.96857 18.3687 4.8 18.7757 4.8 19.2C4.8 19.6243 4.96857 20.0313 5.26863 20.3314C5.56869 20.6314 5.97565 20.8 6.4 20.8H27.2V24H6.4C5.12696 24 3.90606 23.4943 3.00589 22.5941C2.10571 21.6939 1.6 20.473 1.6 19.2C1.6 17.927 2.10571 16.7061 3.00589 15.8059C3.90606 14.9057 5.12696 14.4 6.4 14.4H6.928L4.8 8L3.2 3.2H0V0H4.8C5.22435 0 5.63131 0.168571 5.93137 0.468629C6.23143 0.768687 6.4 1.17565 6.4 1.6V3.2ZM8 32C7.15131 32 6.33737 31.6629 5.73726 31.0627C5.13714 30.4626 4.8 29.6487 4.8 28.8C4.8 27.9513 5.13714 27.1374 5.73726 26.5373C6.33737 25.9371 7.15131 25.6 8 25.6C8.84869 25.6 9.66263 25.9371 10.2627 26.5373C10.8629 27.1374 11.2 27.9513 11.2 28.8C11.2 29.6487 10.8629 30.4626 10.2627 31.0627C9.66263 31.6629 8.84869 32 8 32ZM24 32C23.1513 32 22.3374 31.6629 21.7373 31.0627C21.1371 30.4626 20.8 29.6487 20.8 28.8C20.8 27.9513 21.1371 27.1374 21.7373 26.5373C22.3374 25.9371 23.1513 25.6 24 25.6C24.8487 25.6 25.6626 25.9371 26.2627 26.5373C26.8629 27.1374 27.2 27.9513 27.2 28.8C27.2 29.6487 26.8629 30.4626 26.2627 31.0627C25.6626 31.6629 24.8487 32 24 32Z"
                        />
                      </svg>
                      <span>
                      Checkout
                      </span>
                    </button>
                    <div className="pr-0 sm:pr-20 md:pr-36">
                      <span className="px-4">
                        Total :
                      </span>
                      <span>
                        {totalPrice}$
                      </span>
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
