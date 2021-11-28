/* eslint-disable react-hooks/exhaustive-deps */
import React, { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import { SubmitHandler } from "react-hook-form";

import { useUser } from "@/contexts/AuthContext";
import { GroqData } from "@/interfaces/groqData";
import { Steps } from "@/components/Steps";
import { productSolver } from "@/utils/groqResolver";
import QtyHandler from "@/components/QtyHandler";
import UseBasket from "@/utils/basket";
import { sanityImage } from "@/utils/sanity";
import { App } from "@/interfaces/app";
import { BasketSVG, LocationSVG, XSVG } from "@/lib/svg";
import { usePayment } from "@/contexts/PaymentContext";
import Container from "@/container/Container";
import FormContainer from "@/container/FormContainer";
import Input from "@/components/Input";
import useFormRef from "@/hooks/useFormRefs";
import { addressSchema } from "@/utils/formValidations";
import FormInputButton from "@/components/FormInputButton";
import Label from "@/components/Label";

export const Index = () => {
  const { session, user, basket, setBasket, loading } = useUser();
  const { register, handleSubmit, errors } = useFormRef(addressSchema);
  const { setPaymentObject } = usePayment()
  const [data, setData] = useState<GroqData.Products | null>(null);
  const dataLen = Array.isArray(data) && data.length;
  const [basketIdCountObj, setBasketCountObj] = useState<any | null>(null);
  const [paymentData, setPaymentData ] = useState<any | null>(null);
  const [totalPrice, setTotalPrice ] = useState<any | null>(null);
  const [region, setRegion] = useState<string>('');
  const [country, setCountry] = useState<string>('');
  const [phone, setPhone] = useState<string | null>("");

  const phoneChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      const replacedValue = e.target.value.replace(/[^0-9]/g, "");
      if (replacedValue.length <= 10) {
        const numbers = replacedValue
          .split("")
          .map((letter, idx) =>
            idx === 3 || idx === 6 ? "-" + letter : letter
          );
          setPhone(numbers.join(""));
      }
    } else {
      setPhone("");
    }
  };

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

  useEffect(() => {
    if(data) {
      const paymentObject = Array.isArray(data) &&
      data.reduce(
        (acc, cur) => ({
          ...acc,
          [cur._id]: {
            count: basketIdCountObj[cur._id as keyof typeof basketIdCountObj][0],
            price: cur.defaultProductVariant.price,
            title: cur.title,
          },
        }),
        {}
      );
      setPaymentData(paymentObject)
    }
  }, [data])

  useEffect(() => {
    if (paymentData) {
      const currentTotalPrice =
      Object.keys(paymentData).reduce((acc, cur) => {
        const paymentObj = paymentData[cur as keyof typeof paymentData];
        return acc + paymentObj.price * paymentObj.count;
      }, 0);
      setTotalPrice(currentTotalPrice)
      setPaymentObject({...paymentData, totalPrice: currentTotalPrice})
    }
  }, [paymentData])

  const addressSubmit: SubmitHandler<App.FormValues> = (data) => {
    console.log("sa")
    console.log(data);
  };

  return (
    <Container>
      {!loading ? (
        <div className="mt-20 p-3 sm:p-10 max-w-4xl mx-auto">
          <div>
            <Steps step={["Basket"]} />
          </div>
          <div className="min-w-screen prose-sm flex flex-col justify-center px-5 pb-10 pt-16">
            <FormContainer
            svg={LocationSVG}
            head={"Address info"}
            >
            <form
                onSubmit={handleSubmit((data) => addressSubmit(data))}
                className="custom-card"
              >
                <div className="mb-3">
                  <Label
                  text={"Country"}
                  />
                  <CountryDropdown
                    value={country}
                    onChange={(value) => setCountry(value)}
                    classes={"select select-bordered border-2 block w-full max-w-xs"}
                    />
                </div>
                <div className="mb-3">
                <Label
                  text={"Region"}
                  />
                  <RegionDropdown
                    country={country}
                    value={region}
                    onChange={(value) => setRegion(value)}
                    classes={"select select-bordered border-2 block w-full max-w-xs"}
                    />
                </div>
                <div className="mb-3 w-full">
                <Label
                  text={"Name Surname"}
                  />
                  <div>
                    <Input
                      className={"w-full border-2 rounded-md"}
                      placeholder={"John Smith"}
                      type={"text"}
                      name={"username"}
                      registerRef={register}
                      errors={errors.username}
                    />
                  </div>
                </div>
                <div className="mb-3 w-full">
                <Label
                  text={"Phone"}
                  />
                  <div>
                    <Input
                      className={"w-full border-2 rounded-md"}
                      placeholder={"123-456-7890"}
                      type={"tel"}
                      name={"phone"}
                      registerRef={register}
                      errors={errors.phone}
                      changer={phoneChange}
                      value={phone}
                    />
                  </div>
                </div>
                <div className="mb-3 w-full">
                <Label
                  text={"Address"}
                  />
                  <div>
                    <Input 
                      type={"textarea"}
                      name={"address"}
                      placeholder={"Address"}
                      registerRef={register}
                      errors={errors.address}
                      />
                  </div>
                </div>
              <div>
                <FormInputButton
                  value={"Save"}
                  />
              </div>
            </form>
          </FormContainer>
          {basket ? (
            <div className="mt-10 shadow-2xl rounded-lg py-2">
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
                            (currenBasketItems[0] * Number(price)).toFixed(2)}
                          $
                        </div>
                        <button
                          onClick={(e) => removeHandler(e, _id, 1, null)}
                          className="btn btn-sm leading-4"
                        >
                          <XSVG customClass={"w-5 h-5 mr-2"} />
                          Delete
                        </button>
                      </div>
                    );
                  })}
                <div className="mt-10 pl-0 sm:pl-1 flex justify-center items-center sm:justify-between">
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
        </div>
      ) : (
        <div className="mt-20">Pls wait...</div>
      )}
    </Container>
  );
};

export default Index;
