import React from "react";

import ErrorSVG from "@/public/static/svg/error.svg";
import CheckSVG from "@/public/static/svg/check.svg";
import { App } from "@/interfaces/app";

const typer: App.AlertGetter = {
  'warning': <ErrorSVG className="w-6 h-6 mx-2" />,
  'error': <ErrorSVG className="w-6 h-6 mx-2" />,
  'success': <CheckSVG className="w-6 h-6 mx-2" />,
  getAlert: function(type) { return this[type as keyof App.AlertName]}
}

const Alert = ({ message, type, svgName }: App.Alert) => {
  const svg = typer.getAlert(svgName);
  return (
    <div className={`alert mt-2 ${type}`}>
      <div className="flex-1 justify-center">
        {svg}
        <label>{message}</label>
      </div>
    </div>
  );
};

export default Alert;
