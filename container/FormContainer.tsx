import { App } from "@/interfaces/app";
import React from "react";

const FormContainer = ({ svg, head, children }: App.FormContainer) => {
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
