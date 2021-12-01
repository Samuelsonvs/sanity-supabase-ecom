import React from "react";

interface P {
  svg: () => JSX.Element;
  head: string;
  children: JSX.Element;
}

const FormContainer = ({ svg, head, children }: P) => {
  return (
    <div className="w-full mx-auto rounded-lg bg-white shadow-2xl p-5 text-gray-700 max-w-xl">
      <div className="w-full pt-1 pb-5">
        <div className="bg-yellow-600 text-white overflow-hidden rounded-full w-20 h-20 -mt-16 mx-auto shadow-lg flex justify-center items-center">
          <div className="w-12 h-12">{svg()}</div>
        </div>
      </div>
      <div className="mb-10">
        <h1 className="text-center font-bold text-xl uppercase">{head}</h1>
      </div>
      {children}
    </div>
  );
};

export default FormContainer;
