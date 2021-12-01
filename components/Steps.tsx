import { App } from "@/interfaces/app";
import React from "react";

const stepNames = ["Basket", "Purchase", "Receive Product"];

export const Steps = ({ step }: App.Steps) => {
  return (
    <ul className="w-full steps">
      {stepNames.map((name, idx) => {
        return (
          <li
            key={idx}
            className={`step ${step.includes(name) && "step-primary"}`}
          >
            {name}
          </li>
        );
      })}
    </ul>
  );
};
