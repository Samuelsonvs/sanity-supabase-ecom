import React, { useEffect } from "react";
import Link from "next/link";

import Container from "@/container/Container";
import { usePayment } from "@/contexts/PaymentContext";
import Alert from "@/components/Alert";
import { useRouter } from "next/router";
import { Steps } from "@/components/Steps";

const Success = () => {
  const { paymentObject } = usePayment();
  const router = useRouter();

  useEffect(() => {
    if (!paymentObject) {
      router.replace("/orders");
    }
  }, [paymentObject]);

  return (
    <Container>
      <>
        <div>
          <Steps step={["Basket", "Purchase", "Receive Product"]} />
        </div>
        <div className="py-20">
          {paymentObject && (
            <div>
              <Alert
                message={"Purchase is success. Your order is preparing..."}
                type={"alert-success"}
                svgName={"success"}
              />
            </div>
          )}
          <div className="flex justify-center mt-10">
            <Link passHref href="/orders">
              <a className="btn btn-accent">Go to my orders page</a>
            </Link>
          </div>
        </div>
      </>
    </Container>
  );
};

export default Success;
