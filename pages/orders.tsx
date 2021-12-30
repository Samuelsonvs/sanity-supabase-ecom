import React from "react";

import { useUser } from "@/contexts/AuthContext";
import { dateResolver } from "@/utils/dateResolver";
import Collapse from "@/components/Collapse";
import withAuth from "@/container/AuthContainer";
import Alert from "@/components/Alert";

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
              const addressName = Object.keys(address)[0]
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
                      <div>
                        <div className="py-2">
                          <span className="border-b-2 border-gray-800 font-semibold uppercase">
                            {addressName}
                          </span>
                        </div>
                        <div>
                          <ul>
                            {innerAddressAlignment.map((section, idx) => (
                              <li key={idx}><span className="font-semibold capitalize">{section}: </span>{address[addressName][section]}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      <div>
                        
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
