import React, { ChangeEvent, useState } from "react";
import Image from "next/image";

import { months, years } from "@/constants/arrays";
import { CreditCardSVG } from "@/lib/svg";
import { useUser } from "@/contexts/AuthContext";
import { SubmitHandler } from "react-hook-form";
import { App } from "@/interfaces/app";
import useFormRef from "@/hooks/useFormRefs";
import Input from "@/components/Input";
import { cardSchema } from "@/utils/formValidations";
import { usePayment } from "@/contexts/PaymentContext";
import Container from "@/container/Container";

export const Index = () => {
  const { loading, basket } = useUser();
  const { paymentObject } = usePayment()
  const [debitValue, setDebitValue] = useState<string | null>("");
  const { register, handleSubmit, errors } = useFormRef(cardSchema);
  console.log(paymentObject)

  const debitChance = (e: ChangeEvent<HTMLInputElement>) => {
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

  const submitHandler: SubmitHandler<App.FormValues> = (data) => {
    typeof debitValue === "string" && console.log(debitValue.length);
    console.log(data);
  };

  return (
    <Container>
      {!loading ? (
        <div className="min-w-screen min-h-screen bg-gray-200 flex items-center justify-center px-5 pb-10 pt-16">
          <div className="w-full mx-auto rounded-lg bg-white shadow-lg p-5 text-gray-700 max-w-xl">
            <div className="w-full pt-1 pb-5">
              <div className="bg-yellow-600 text-white overflow-hidden rounded-full w-20 h-20 -mt-16 mx-auto shadow-lg flex justify-center items-center">
                <CreditCardSVG />
              </div>
            </div>
            <div className="mb-10">
              <h1 className="text-center font-bold text-xl uppercase">
                Secure payment info
              </h1>
            </div>
            <form
              onSubmit={handleSubmit((data) => submitHandler(data))}
              className="custom-card"
            >
              <div className="mb-3 flex flex-col sm:flex-row space-y-5 sm:space-y-0 -mx-2">
                <div className="px-2">
                  <label
                    htmlFor="type1"
                    className="flex items-center cursor-pointer"
                  >
                    <input
                      type="radio"
                      className="form-radio h-5 w-5 text-yellow-600"
                      name="type"
                      id="type1"
                      defaultChecked
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
                    <input
                      type="radio"
                      className="form-radio h-5 w-5 text-yellow-600"
                      name="type"
                      id="type2"
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
                <label className="font-bold text-sm mb-2 ml-1">
                  Name on card
                </label>
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
                <label className="font-bold text-sm mb-2 ml-1">
                  Card number
                </label>
                <div>
                  <Input
                    className={"w-full border-2 rounded-md"}
                    placeholder={"0000 0000 0000 0000"}
                    type={"text"}
                    name={"cardnumber"}
                    registerRef={register}
                    errors={errors.cardnumber}
                    changer={debitChance}
                    value={debitValue}
                  />
                </div>
              </div>
              <div className="mb-3 -mx-2 flex items-end">
                <div className="px-2 w-1/2">
                  <label className="font-bold text-sm mb-2 ml-1">
                    Expiration date
                  </label>
                  <div>
                    <select className="form-select w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors cursor-pointer">
                      {months.map((month, idx) => {
                        return (
                          <option key={idx} value={month[0]}>
                            {month[0]} - {month[1]}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>
                <div className="px-2 w-1/2">
                  <select className="form-select w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors cursor-pointer">
                    {years.map((year, idx) => {
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
                <label className="font-bold text-sm mb-2 ml-1">
                  Security code
                </label>
                <div>
                  <Input
                    className={" border-2 rounded-md"}
                    placeholder="000"
                    type={"text"}
                    name={"securitycode"}
                    registerRef={register}
                    errors={errors.securitycode}
                  />
                </div>
              </div>
              <div>
                <input
                  type="submit"
                  value="Submit"
                  className="flex space-x-4 justify-center items-center cursor-pointer w-full max-w-xs mx-auto bg-yellow-600 hover:bg-yellow-700 focus:bg-yellow-700 text-white rounded-lg px-3 py-3 font-semibold"
                />
              </div>
            </form>
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </Container>
  );
};

export default Index;
