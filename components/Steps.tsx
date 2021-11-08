import React from "react";

interface Prop {
  step: string[];
}

const stepNames = ["Basket", "Purchase", "Receive Product"];

export const Steps = ({ step }: Prop) => {
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
