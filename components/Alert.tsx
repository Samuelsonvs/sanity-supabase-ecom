import React from 'react';

import ErrorSVG from "@/public/static/svg/error.svg";
import CheckSVG from "@/public/static/svg/check.svg";
import { App } from '@/interfaces/app';

const Alert = ({message, type}: App.Alert) => {
    return (
        <div className={`alert mt-2 ${type}`}>
          <div className="flex-1">
                {type === "alert-error" && <ErrorSVG className="w-6 h-6 mx-2" />}
                {type === "alert-success" && <CheckSVG className="w-6 h-6 mx-2" />}
            <label>{message}</label>
          </div>
        </div>
    )
}

export default Alert
