import React from "react";
import Link from "next/link";
import Image from "next/image";

import { useUser } from "@/contexts/AuthContext";
import { dateResolver } from "@/utils/dateResolver";
import Collapse from "@/components/Collapse";
import withAuth from "@/container/AuthContainer";
import Alert from "@/components/Alert";
import { sanityImage } from "@/utils/sanity";

const Orders = () => {
  const { productHistory } = useUser();
  console.log(productHistory);
  return (
    <div className="mt-0 sm:mt-20">
      <div className="w-full px-4 pt-2 sm:pt-16">
        {productHistory ?
          Object.keys(productHistory)
            .reverse()
            .map((productDate, idx) => {
              const date = dateResolver(Number(productDate));
              const { price, address, card, products } =
                productHistory[productDate as keyof typeof productHistory];
              const cardValues:any = Object.values(card)[0];
              const { cardname, lastdigits, month, year } = cardValues;
              const addressName = Object.keys(address)[0];
              const innerAddressAlignment = ['username', 'country', 'region', 'phone', 'address'];
              return (
                <div
                  key={idx}
                  className="w-full max-w-xl p-2 mx-auto bg-white rounded-2xl"
                >
                  <Collapse
                    date={date}
                    price={price + " $"}
                    status={"info"}
                  >
                    <div>
                      <div className="flex flex-col sm:flex-row sm:justify-between">
                        <div className="flex-1 pr-2">
                          <div className="py-2">
                            <span className="border-b-2 border-gray-800 font-semibold uppercase">
                              {addressName}
                            </span>
                          </div>
                          <div>
                            <ul>
                              {innerAddressAlignment.map((section, idx) => (
                                <li key={idx}><span className="font-semibold inline-block capitalize">{section}: </span>{address[addressName][section]}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                        <div className="flex-1 pl-0 sm:pl-2">
                          <div className="py-2">
                            <span className="border-b-2 border-gray-800 font-semibold uppercase">
                              Card Details
                            </span>
                          </div>
                          <div>
                            <ul>
                              <li><span className="font-semibold">Cardname: </span>{cardname}</li>
                              <li><span className="font-semibold">CardNumber: </span>&lowast;&lowast;&lowast;&lowast;-&lowast;&lowast;&lowast;&lowast;-&lowast;&lowast;&lowast;&lowast;-{lastdigits}</li>
                              <li><span className="font-semibold">Date: </span>{month}/{year}</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div className="pt-2">
                        {Object.keys(products).map((productKey, idx) => {
                          if (productKey !== "totalPrice") {
                            const { count, image, price, slug, title, Color } = products[productKey];
                            const exactSlug = `/product/${slug}`;
                            return (
                              <div
                              key={idx}
                              className="flex flex-col items-center sm:items-start space-y-3 md:space-y-0 md:flex-row md:items-center justify-between py-1"
                            >
                              <div className="w-full flex flex-col items-center sm:flex-row justify-between space-y-3 sm:space-y-0">
                                <Link passHref href={exactSlug}>
                                  <a>
                                    <Image
                                      alt="ss"
                                      src={sanityImage(image, 170, 120) || ""}
                                      loading="lazy"
                                      title={"ss"}
                                      className="rounded-xl cursor-pointer"
                                      height={120}
                                      width={170}
                                    />
                                  </a>
                                </Link>
                                <Link passHref href={exactSlug}>
                                  <a className="w-40 leading-5 text-sm hover:underline">
                                    {title}
                                  </a>
                                </Link>
                                <div
                                  className="my-auto w-4 h-4 rounded-full"
                                  style={{ backgroundColor: `${Color.hex}` }}
                                ></div>
                                <div>
                                  {count}
                                </div>
                                <div>
                                  $ {price}
                                </div>
                              </div>
                            </div>
                            )
                          }
                        })}
                      </div>
                    </div>
                  </Collapse>
                </div>
              );
            })
          : (
          <div>
            <Alert
              message={"There are no products here"}
              type={"alert-warning"}
              svgName={"warning"}
            />
          </div>
          )}
      </div>
    </div>
  );
};

export default withAuth(Orders);
