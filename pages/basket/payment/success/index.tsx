import React, { useEffect } from 'react'

import Container from '@/container/Container';
import { usePayment } from "@/contexts/PaymentContext";
import Alert from '@/components/Alert';
import { useRouter } from "next/router";

const Success = () => {
    const { purchase } = usePayment();
    const router = useRouter();

    return (
        <Container>
            <div className="mt-20">
              {purchase && (
                  <div>
                      <Alert
                      message={"Purchase is success. You are routing to my orders page in couple of minutes..."}
                      type={"alert-success"}
                      />
                  </div>
              )}
              <button className="btn btn-accent">
                  Go to my orders page 
            </button>  
            </div>
        </Container>
    )
}

export default Success
