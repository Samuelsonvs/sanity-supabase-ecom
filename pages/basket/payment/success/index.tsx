import React from 'react'

import Container from '@/container/Container';
import { usePayment } from "@/contexts/PaymentContext";

const Success = () => {
    const { purchase } = usePayment();
    return (
        <Container>
            <div className="mt-20">
              {purchase && (
                  <div>
                      Payment Success
                  </div>
              )}  
            </div>
        </Container>
    )
}

export default Success
