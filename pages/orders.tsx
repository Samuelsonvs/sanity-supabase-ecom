import React from "react";

import { useUser } from "@/contexts/AuthContext";
import { dateResolver } from "@/utils/dateResolver";
import Collapse from "@/components/Collapse";
import withAuth from "@/container/AuthContainer";

const Orders = () => {
  const { productHistory } = useUser();
  console.log(productHistory);
  return (
    <div className="mt-20">
      <div className="w-full px-4 pt-16">
        {productHistory &&
          Object.keys(productHistory)
            .reverse()
            .map((productDate, idx) => {
              const date = dateResolver(Number(productDate));
              const { price } =
                productHistory[productDate as keyof typeof productHistory];
              return (
                <div
                  key={idx}
                  className="w-full max-w-xl p-2 mx-auto bg-white rounded-2xl"
                >
                  <Collapse
                    date={date}
                    price={price + " $"}
                    content={
                      "If you're unhappy with your purchase for any reason, email us within 90 days and we'll refund you in full, no questions asked."
                    }
                    status={"info"}
                  />
                </div>
              );
            })}
      </div>
    </div>
  );
};

export default withAuth(Orders);
