/* eslint-disable react-hooks/exhaustive-deps */
import React, { ChangeEvent, Fragment, MouseEvent, useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

import Container from "@/container/Container";
import { useUser } from "@/contexts/AuthContext";
import { GroqData } from "@/interfaces/groqData";
import { useRouter } from "next/router";
import { Steps } from "@/components/Steps";
import { productSolver } from "@/utils/groqResolver";
import { App } from "@/interfaces/app";
import QtyHandler from "@/components/QtyHandler";
import UseBasket from "@/utils/basket";

export const Index = () => {
  const router = useRouter();
  const { session, user, basket, setBasket, loading } = useUser();
  const [data, setData] = useState<GroqData.Products | null>(null);
  const [basketIdCountObj, setBasketCountObj] = useState<any | null>(null)

  const handleQty = async (qtyParam: number, _id?: string, isVariant?: string | null) => {
    try {
      if (user && _id) {
        const { result } = await UseBasket({
          _id,
          isVariant: isVariant ?? null,
          count: qtyParam,
          method: 'UPDATE',
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

  const removeHandler = async (e: MouseEvent<HTMLButtonElement | MouseEvent> ,_id: string, count: number, isVariant: string | null) => {
    if (user) {
      const { result } = await UseBasket({
        _id,
        count,
        isVariant,
        method: 'REMOVE',
        user,
        basket,
        setBasket,
      });
      if (result) {
        console.log(result);
      } else {
        (e.target as HTMLButtonElement).classList.add("hidden")
      }
    }
  }
  
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
      setBasketCountObj(basket?.reduce((list, product) => ({ ...list, [product._id]: [product.count, product.isVariant]}), {}))
    }
  }, [session, basket]);


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
                const currenBasketItems = basketIdCountObj && basketIdCountObj[_id as keyof typeof basketIdCountObj]
                return (
                  <Fragment key={idx}>
                    {currenBasketItems &&
                      <QtyHandler
                      setter={handleQty}
                      inputQty={Number(currenBasketItems[0])}
                      qty={qty}
                      min={1}
                      _id={_id}
                      isVariant={currenBasketItems[1]}
                      max={qty}
                      step={1}
                      css={"w-5"}
                      containerCss={"ml-3 py-2 border rounded-3xl"}
                    />
                    }
                    <button className="mt-10" onClick={(e) => removeHandler(e, _id, 1, null )}>Delete</button>
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
