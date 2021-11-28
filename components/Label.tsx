import React from 'react'

interface P {
    text: string
}

const Label = ({text}: P) => {
    return (
        <label className="font-bold text-sm mb-2 ml-1">
            {text}
        </label>
    )
}

export default Label
