import React from "react";
import Clock from "@/public/static/svg/clock.svg";
import Success from "@/public/static/svg/check.svg";
import Cargo from "@/public/static/svg/cargo.svg";
import X from "@/public/static/svg/x.svg";

interface P {
  status: string;
}

const svg = (status: string) => {
  switch (status) {
    case "info":
      return <Clock className="inline-block w-4 h-4 mr-2 stroke-current" />;
    case "warning":
      return <Cargo className="inline-block w-6 h-6 mr-2 stroke-current" />;
    case "success":
      return <Success className="inline-block w-4 h-4 mr-2 stroke-current" />;
    case "error":
      return <X className="inline-block w-4 h-4 mr-2 stroke-current" />;
    default:
      break;
  }
};

const text = {
  info: "Ordered",
  warning: "Shipping",
  success: "Delivered",
  error: "Canceled",
};

const statusClass = {
  info: "badge-info",
  warning: "badge-warning",
  success: "badge-success",
  error: "badge-error",
}

const Badge = ({ status }: P) => {
  return (
    <div className={`badge ${statusClass[status as keyof typeof statusClass]} flex items-center`}>
      {svg(status)}
      {text[status as keyof typeof text]}
    </div>
  );
};

export default Badge;
