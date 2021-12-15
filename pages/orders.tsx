import React from 'react';

import Container from "@/container/Container";
import { useUser } from '@/contexts/AuthContext';

const Orders = () => {
    const { productHistory } = useUser();
    return (
        <Container>
            <div className='mt-20'>
                <button className='btn'>sa</button>
            </div>
        </Container>
    )
}

export default Orders
