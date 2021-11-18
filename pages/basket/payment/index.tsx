import React, { ChangeEvent, useState } from "react";
import Image from "next/image";

import Container from "@/container/Container";
import { months, years } from "@/constants/arrays";
import { CreditCardSVG, LockSVG } from "@/lib/svg";

export const Index = () => {
  const [debitValue, setDebitValue] = useState<number>()

  const debitChance = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length < 12)
    setDebitValue(Number(e.target.value))
  };

  console.log(debitValue)
  return (
    <Container>
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
                  checked
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
            <label className="font-bold text-sm mb-2 ml-1">Name on card</label>
            <div>
              <input
                className="w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors"
                placeholder="John Smith"
                type="text"
              />
            </div>
          </div>
          <div className="mb-3">
            <label className="font-bold text-sm mb-2 ml-1">Card number</label>
            <div>
              <input
                onChange={(e) => debitChance(e)}
                value={debitValue}
                className="w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors"
                placeholder="0000 0000 0000 0000"
                type="text"
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
            <label className="font-bold text-sm mb-2 ml-1">Security code</label>
            <div>
              <input
                className="w-32 px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors"
                placeholder="000"
                type="text"
              />
            </div>
          </div>
          <div>
            <button className="flex space-x-4 justify-center items-center w-full max-w-xs mx-auto bg-yellow-600 hover:bg-yellow-700 focus:bg-yellow-700 text-white rounded-lg px-3 py-3 font-semibold">
              <LockSVG /> <span>PAY NOW</span>
            </button>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Index;
