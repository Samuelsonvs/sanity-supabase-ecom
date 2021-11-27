/* eslint-disable react/display-name */
import React from "react";

import { App } from "@/interfaces/app";
import { ErrorSVG } from "@/lib/svg";
import ErrorMessages from "@/utils/formErrors";

export const Input = ({
  type,
  id,
  placeholder,
  className = "",
  defaultValue = "",
  disabled = false,
  checked = false,
  name,
  errors,
  registerRef,
  changer,
  value,
}: App.InputTypes) => {
  const errorName = name as keyof typeof ErrorMessages;
  const errorType =
    errors?.type as keyof typeof ErrorMessages[typeof errorName];
  return (
    <>
      {type === "radio" ? (
        <input
        id={id}
        type={type}
        className={"form-radio h-5 w-5 text-yellow-600 cursor-pointer"}
        {...registerRef(name)}
        defaultChecked={checked}
        value={value}
      />
      ) : changer ? (
        <input
          type={type}
          className={`input input-bordered ${className}`}
          placeholder={placeholder}
          disabled={disabled}
          {...registerRef(name)}
          onChange={(e) => changer(e)}
          value={value}
        />
      ) : (
        <input
          type={type}
          className={`input input-bordered ${className}`}
          placeholder={placeholder}
          disabled={disabled}
          defaultValue={defaultValue}
          {...registerRef(name)}
        />
      )}
      {errors && (
        <div className="alert alert-warning mt-2">
          <div className="flex-1">
            <ErrorSVG />
            <label>{ErrorMessages[errorName][errorType]}</label>
          </div>
        </div>
      )}
    </>
  );
};

export default Input;
