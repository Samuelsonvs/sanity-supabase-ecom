/* eslint-disable react/display-name */
import React, { ChangeEvent, forwardRef, ForwardedRef } from "react";
import { Dispatch, SetStateAction } from "react";
import { ChangeHandler } from "react-hook-form";

interface InputTypes {
  type: string;
  placeholder: string;
  name: string;
  defaultValue?: string;
  className?: string;
  disabled?: boolean;
  onChange?: Dispatch<SetStateAction<string | null>>;
  onBlur: ChangeHandler;
}

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
    }: InputTypes,
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
