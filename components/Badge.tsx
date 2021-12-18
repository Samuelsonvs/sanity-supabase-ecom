import React from 'react'

interface P {
    status: string;
}

const Badge = ({status}:P) => {
    return (
        <div className={`badge badge-${status}`}>
            Delivered
        </div>
    )
}

export default Badge
