import React from 'react';

import ErrorSVG from "@/public/static/svg/error.svg";
import CheckSVG from "@/public/static/svg/check.svg";
import { App } from '@/interfaces/app';


const typer = (type: string) => {
  switch (type) {
    case "alert-warning":
    case "alert-error":
      return (
        <ErrorSVG className="w-6 h-6 mx-2" />
      )
    case "alert-success":
      return (
        <CheckSVG className="w-6 h-6 mx-2" />
      )
    default:
      break;
  }
}

const Alert = ({message, type}: App.Alert) => {
  const svg = typer(type)
    return (
        <div className={`alert mt-2 ${type}`}>
          <div className="flex-1">
            {svg}
            <label>{message}</label>
          </div>
        </div>
    )
}

export default Alert
