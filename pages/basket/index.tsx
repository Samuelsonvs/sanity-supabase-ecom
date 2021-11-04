/* eslint-disable react-hooks/exhaustive-deps */
import React, { ChangeEvent, Fragment, useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

import Container from "@/container/Container";
import { useUser } from "@/contexts/AuthContext";
import { GroqData } from "@/interfaces/groqData";
import { useRouter } from "next/router";
import { Steps } from "@/components/Steps";
import { productSolver } from "@/utils/groqResolver";
import { App } from "@/interfaces/app";

interface Prop {
  qty : number
}

export const Index = () => {
  const router = useRouter();
  const { session, basket, setBasket, loading } = useUser();
  const [data, setData] = useState<GroqData.Products | null>(null);
  const [submitLoading, setSubmitLoading] = useState<boolean>(true);
  const [customQty, setCustomQty] = useState<number | null>(null);

  const handleQty = async (e: any) => {
    e.preventDefault()
    try {
      setSubmitLoading(true);
      console.log(e)
    } catch (error: any) {
      alert(error.error_description || error.message);
    } finally {
      setSubmitLoading(false);
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
    }
  }, [session, basket]);


  useEffect(() => {
    if (!session) {
      router.replace("/");
    }
  }, [session]);

  return (
    <Container>
      {!loading ? (
        <div className="mt-20 p-10 max-w-4xl mx-auto">
        <div>
        <Steps
          step={['Basket']}
        />
        </div>
        {basket ? (
          <div className="mt-10 shadow-2xl">
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
                return (
                  <Fragment key={idx}>
                    <div>{product._id}</div>
                    <form
                    onSubmit={(e) => handleQty(e)}
                    className="custom-card"
                    >
                      <div className="inline py-2 border">
                        <input type="submit" className="cursor-pointer p-1" value="-" />
                        <input
                          className="w-7"
                          type={"number"}
                          min="1"
                          max="999"
                          step="1"
                          defaultValue={basket[idx].count}
                          disabled
                        />
                        <input type="submit" className="cursor-pointer p-1" value="+" />
                      </div>
                  </form>
                </Fragment>
                )
              })}
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
