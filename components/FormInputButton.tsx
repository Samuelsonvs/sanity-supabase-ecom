import React from 'react'

interface P {
    value: string
}

const FormInputButton = ({value}: P) => {
    return (
        <input
        type="submit"
        value={value}
        className="flex btn space-x-4 justify-center items-center cursor-pointer w-full max-w-xs mx-auto bg-yellow-600 hover:bg-yellow-700 focus:bg-yellow-700 text-white rounded-lg px-3 py-3 font-semibold border-none"
      />
    )
}

export default FormInputButton
