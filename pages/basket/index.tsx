import React, { useEffect, useState } from "react";

import Container from "@/container/Container";
import { useUser } from "@/contexts/AuthContext";
import { GroqData } from "@/interfaces/groqData";

export const Index = () => {
  const { session, basket, setBasket, loading } = useUser();
  const [data, setData] = useState<GroqData.Products | null>(null);

  if (data) {
    console.log(data);
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
    }
  }, [session, basket]);

  return (
    <Container>
      {!loading ? (
        basket ? (
          <div className="mt-20">
            {data &&
              Array.isArray(data) &&
              data.map((product: any) => product._id)}
          </div>
        ) : (
          <div className="mt-20">There are no products in your cart.</div>
        )
      ) : (
        <div className="mt-20">Pls wait...</div>
      )}
    </Container>
  );
};

export default Index;
