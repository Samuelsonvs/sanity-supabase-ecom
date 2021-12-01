import React from "react";

interface P {
  svg: () => JSX.Element;
  head: string;
  children: JSX.Element;
}

const FormContainer = ({ svg, head, children }: P) => {
  return (
    <div className="form-container">
      <div className="svg-container">
        <div className="svg-inner-container">
          <div className="svg">{svg()}</div>
        </div>
      </div>
      <div className="header-container">
        <h1 className="header-h1">{head}</h1>
      </div>
      {children}
    </div>
  );
};

export default FormContainer;
