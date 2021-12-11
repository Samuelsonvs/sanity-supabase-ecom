import React from 'react';

import Container from "@/container/Container";
import { useUser } from '@/contexts/AuthContext';

const Orders = () => {
    const { user } = useUser();

    return (
        <Container>
            <div>
                <button className='btn'>sa</button>
            </div>
        </Container>
    )
}

export default Orders
