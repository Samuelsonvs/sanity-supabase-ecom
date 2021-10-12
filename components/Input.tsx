/* eslint-disable react/display-name */
import React, { ChangeEvent, forwardRef, ForwardedRef } from "react";
import { App } from "@/interfaces/app"

export const Input = forwardRef(
  (
    {
      type,
      placeholder,
      className = "",
      defaultValue = "",
      disabled = false,
      onChange,
      onBlur,
      name,
    }: App.InputTypes,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
      if (onChange) {
        onChange(e.target.value);
      }
      return null;
    };

    return (
      <input
        type={type}
        className={`input input-bordered ${className}`}
        placeholder={placeholder}
        ref={ref}
        onBlur={onBlur}
        disabled={disabled}
        defaultValue={defaultValue}
        name={name}
        onChange={handleOnChange}
      />
    );
  }
);

export default Input;
