/* eslint-disable react-hooks/exhaustive-deps */
import React, { ChangeEvent, useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { SubmitHandler } from "react-hook-form";

import Dates from "@/constants/yearsMonths.json";
import CreditCardSVG from "@/public/static/svg/creditCard.svg";
import { useUser } from "@/contexts/AuthContext";
import { App } from "@/interfaces/app";
import useFormRef from "@/hooks/useFormRefs";
import Input from "@/components/Input";
import { cardSchema } from "@/utils/formValidations";
import { usePayment } from "@/contexts/PaymentContext";
import Container from "@/container/Container";
import { Steps } from "@/components/Steps";
import FormContainer from "@/container/FormContainer";
import FormInputButton from "@/components/FormInputButton";
import Label from "@/components/Label";
import Modal from "@/components/Modal";
import { setPayment, updateCards, updateProductHistory } from "@/utils/supabaseClient";
import { dateResolver } from "@/utils/dateResolver";

export const Index = () => {
  const { months, years } = Dates;
  const { session, user, setBasket, setPaymentMethods, paymentMethods, loading, setProductHistory, productHistory } = useUser();
  const { paymentObject, selectedAddress, setPurchase } = usePayment();
  const [formStatus, setFormStatus] = useState<boolean>(false)
  const [debitValue, setDebitValue] = useState<string | null>("");
  const [securityValue, setSecurityValue] = useState<string | null>("");
  const { register, handleSubmit, errors } = useFormRef(cardSchema);
  const [sureModal, setSureModal] = useState<boolean>(false)
  const [currentCard, setCurrentCard] = useState<any | null>(null)
  const router = useRouter();

  const debitChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      const replacedValue = e.target.value.replace(/[^0-9]/g, "");
      if (replacedValue.length <= 16) {
        const numbers = replacedValue
          .split("")
          .map((letter, idx) =>
            idx % 4 === 0 && idx !== 0 ? " " + letter : letter
          );
        setDebitValue(numbers.join(""));
      }
    } else {
      setDebitValue("");
    }
  };

  const securityChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      const replacedValue = e.target.value.replace(/[^0-9]/g, "");
      if (replacedValue.length <= 3) {
        setSecurityValue(replacedValue);
      }
    } else {
      setSecurityValue("");
    }
  };

  const submitPayment: SubmitHandler<App.FormValues> = async (data) => {
    const {cardname, cardnumber, month, payment, securitycode, year} = data
    const key = cardnumber?.split(" ")[3];
    const newcard = {...paymentMethods, [key!]: {cardname: cardname!, cardnumber: cardnumber!, month: month!, payment: payment!, securitycode: securitycode!, year: year!, lastdigits: key!}}
    const updates = await updateCards(newcard, user!.id);
    if (!updates.error) {
      setPaymentMethods(newcard)
      setFormStatus(false)
    } else {
      console.error(updates.error)
    }
  };

  const submitModalHandler = async () => {
    const newHistory = {...productHistory,[Date.now()] : {products: {...paymentObject}, address: {...selectedAddress}, card: {...currentCard}, price: paymentObject!.totalPrice!}}
    const { data, error } = await updateProductHistory(newHistory, user!.id)
    if (error) {
      console.error(error)
    } else {
      setProductHistory(newHistory)
      setBasket(null)
    }
  }

  useEffect(() => {
    if (!session) {
      router.replace("/");
    } else if (!paymentObject) {
      router.replace("/basket");
    }
  }, [session, paymentObject]);

  useEffect(() => {
    if (paymentMethods) {
      const firstPaymentKey = Object.values(paymentMethods)[0]
      const { cardname, year, month, lastdigits } = firstPaymentKey
      setCurrentCard({[lastdigits]: {cardname, year, month, lastdigits}})
    }
  }, [])

  return (
    <Container>
      {!loading ? (
        <div className="mt-20 p-3 sm:p-10 max-w-4xl mx-auto">
          <div>
            <Steps step={["Basket", "Purchase"]} />
          </div>
          <div className="py-20">
            <ul className="flex justify-between">
              <li>
                Name
              </li>
              <ul className="flex space-x-7">
                <li className="pl-24">
                  Date
                </li>
                <li>
                  Last digits
                </li>
              </ul>
            </ul>
              {paymentMethods && Object.values(paymentMethods).map((cardObj, idx) => {
                const { cardname, year, month, lastdigits } = cardObj
                return (
                  <div key={idx} className="border mt-2">
                    <ul className="p-1 flex justify-between">
                      <li className="flex items-center space-x-2">
                        <input onClick={() => setCurrentCard({[lastdigits]: {cardname, year, month, lastdigits}})} className="form-radio h-5 w-5 text-yellow-600 cursor-pointer" type="radio" name="card" defaultChecked={idx === 0 &&  true} />
                        <span>{cardname}</span>
                      </li>
                      <ul className="flex space-x-14">
                        <li>
                          {month+"/"+year.replace("20", "")}
                        </li>
                        <li>
                          {lastdigits}
                        </li>
                      </ul>
                    </ul>
                  </div>
              )
              })}
              <button onClick={() => setFormStatus(true)} className="btn btn-link btn-active text-gray-600" role="button" aria-pressed="true">Add new card</button>
              {paymentObject && (
              <div className="mb-20 mx-auto">
                <ul className="mx-auto text-center font-semibold rounded-lg shadow-2xl p-5 text-gray-700">
                  {Object.keys(paymentObject).map((id, idx) => {
                    const { count, price, title } = paymentObject[id];
                    if (count) {
                      return (
                        <li key={idx}>
                          <div className="text-base">{title}</div>
                          <div className="text-gray-500">
                            {`${count} x ${price}`}
                          </div>
                          <span className="pl-8 text-gray-500">{`= ${(
                            count * price
                          ).toFixed(2)}`}</span>
                        </li>
                      );
                    }
                  })}
                  <li className="border">
                    <span className="px-2">Total :</span>
                    <span className="px-2">{paymentObject.totalPrice}$</span>
                  </li>
                  <li className="pt-3">
                    <button onClick={() => setSureModal(true)} className="btn bg-yellow-600 hover:bg-yellow-700">Buy now</button>
                  </li>
                </ul>
              </div>
            )}
          </div>
          <div className="prose-sm flex flex-col justify-center pb-10">
            {formStatus && (
            <FormContainer svg={CreditCardSVG} head={"Secure payment info"}>
              <form
                onSubmit={handleSubmit((data) => submitPayment(data))}
                className="custom-card"
              >
                <div className="mb-3 flex flex-col sm:flex-row space-y-5 sm:space-y-0 -mx-2">
                  <div className="px-2">
                    <label
                      htmlFor="type1"
                      className="flex items-center cursor-pointer"
                    >
                      <Input
                        type={"radio"}
                        id={"type1"}
                        name={"payment"}
                        registerRef={register}
                        checked={true}
                        value={"Credit"}
                      />
                      <div className="ml-3">
                        <Image
                          src={"/static/images/payment/debitCards.png"}
                          alt="debitcard"
                          width={219}
                          height={34}
                        />
                      </div>
                    </label>
                  </div>
                  <div className="px-2">
                    <label
                      htmlFor="type2"
                      className="flex items-center cursor-pointer"
                    >
                      <Input
                        type={"radio"}
                        id={"type2"}
                        name={"payment"}
                        registerRef={register}
                        value={"Paypal"}
                      />
                      <div className="ml-3">
                        <Image
                          src={"/static/images/payment/paypalCard.png"}
                          alt="paypalcard"
                          width={45}
                          height={34}
                        />
                      </div>
                    </label>
                  </div>
                </div>
                <div className="mb-3">
                  <Label text={"Name on card"} />
                  <div>
                    <Input
                      className={"w-full border-2 rounded-md"}
                      placeholder={"John Smith"}
                      type={"text"}
                      name={"cardname"}
                      registerRef={register}
                      errors={errors.cardname}
                    />
                  </div>
                </div>
                <div className="mb-3">
                  <Label text={"Card number"} />
                  <div>
                    <Input
                      className={"w-full border-2 rounded-md"}
                      placeholder={"0000 0000 0000 0000"}
                      type={"text"}
                      name={"cardnumber"}
                      registerRef={register}
                      errors={errors.cardnumber}
                      changer={debitChange}
                      value={debitValue}
                    />
                  </div>
                </div>
                <div className="mb-3 -mx-2 flex items-end">
                  <div className="px-2 w-1/2">
                    <Label text={"Expiration date"} />
                    <div>
                      <select
                        {...register("month")}
                        className="select select-bordered w-full px-3 py-2 border-2 mb-1 rounded-md focus:outline-none transition-colors cursor-pointer"
                      >
                        {Object.keys(months).map((key, idx) => {
                          const month = months[key as keyof typeof months];
                          return (
                            <option key={idx} value={key}>
                              {key} - {month}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  </div>
                  <div className="px-2 w-1/2">
                    <select
                      {...register("year")}
                      className="select select-bordered w-full px-3 py-2 mb-1 border-2 rounded-md focus:outline-none transition-colors cursor-pointer"
                    >
                      {Object.keys(years).map((key, idx) => {
                        const year = years[key as keyof typeof years];
                        return (
                          <option key={idx} value={year}>
                            {year}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>
                <div className="mb-10">
                  <Label text={"Security code"} />
                  <div>
                    <Input
                      className={" border-2 rounded-md"}
                      placeholder="000"
                      type={"text"}
                      name={"securitycode"}
                      registerRef={register}
                      errors={errors.securitycode}
                      changer={securityChange}
                      value={securityValue}
                    />
                  </div>
                </div>
                <div>
                  <FormInputButton value={"Add card"} />
                </div>
              </form>
            </FormContainer>
            )}
            <Modal
              isOpen={sureModal}
              setIsOpen={setSureModal}
              handler={submitModalHandler}
              dialogTitleMessage={"Buy Now"}
              dialogMessage={"Do you confirm the purchase ?"}
              firstButtonMessage={"Cancel"}
              secondButtonMessage={"Yes"}
              />
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </Container>
  );
};

export default Index;
