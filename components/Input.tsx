/* eslint-disable react/display-name */
import React from "react";

import { App } from "@/interfaces/app";

export const Input = 
  (
    {
      type,
      placeholder,
      className = "",
      defaultValue = "",
      disabled = false,
      name,
      registerRef,
    }: App.InputTypes
  ) => {
    return (
      <input
        type={type}
        className={`input input-bordered ${className}`}
        placeholder={placeholder}
        disabled={disabled}
        defaultValue={defaultValue}
        {...registerRef(name)}
      />
    );
  }

export default Input;
