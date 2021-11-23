/* eslint-disable react/display-name */
import React from "react";

import { App } from "@/interfaces/app";
import { ErrorSVG } from "@/lib/svg";
import ErrorMessages from "@/utils/formErrors";

export const Input = 
  (
    {
      type,
      placeholder,
      className = "",
      defaultValue = "",
      disabled = false,
      name,
      errors,
      registerRef,
    }: App.InputTypes
  ) => {
    const errorName = name as keyof typeof ErrorMessages;
    const errorType = errors?.type as keyof typeof ErrorMessages[typeof errorName];
    return (
      <>
        <input
          type={type}
          className={`input input-bordered ${className}`}
          placeholder={placeholder}
          disabled={disabled}
          defaultValue={defaultValue}
          {...registerRef(name)}
        />
        { errors && 
        (<div className="alert alert-warning mt-2">
          <div className="flex-1">
              <ErrorSVG />
              <label>{ErrorMessages[errorName][errorType]}</label>
          </div>
        </div>)
        }
      </>
    );
  }

export default Input;
