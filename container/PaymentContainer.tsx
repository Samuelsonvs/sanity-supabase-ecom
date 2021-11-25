import React from 'react'
import Container from './Container';

interface P {
    children: JSX.Element
}

const PaymentContainer = ({ children }: P) => {
    return (
        <Container>
            <div>
                {children}
            </div>
        </Container>
    )
}

export default PaymentContainer;