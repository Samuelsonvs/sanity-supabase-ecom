import React, { ChangeEvent, useState } from "react";

import { App } from "@/interfaces/app";

const QtyHandler = ({
  setter,
  inputQty,
  qty,
  min,
  max,
  step,
  css,
  containerCss,
  _id,
  isVariant,
}: App.QtyHandler) => {
  const [qtyLoading, setQtyLoading] = useState<boolean>(false);
  const handleQtyInput = (e: ChangeEvent<HTMLInputElement>) => {
    const number = Number(e.target.value) > qty ? qty : Number(e.target.value);
    if (!_id) {
      setter(number);
    }
  };

  const operators = {
    "+": [qty, "+"],
    "-": [1, "-"],
  };

  const handleQtyNumber = (paramOperator: string) => {
    setQtyLoading(true);
    const currentOperator = operators[paramOperator as keyof typeof operators];
    if (currentOperator !== undefined) {
      const number =
        inputQty === currentOperator[0]
          ? inputQty
          : eval(`${inputQty} ${currentOperator[1]} 1 `);
      setter(number, _id, isVariant);
    } else {
      console.log("Undefined operator.");
    }
    setQtyLoading(false);
  };

  return (
    <div className={containerCss}>
      <button
        className="bg-gray-200 inline"
        onClick={() => handleQtyNumber("-")}
      >
        -
      </button>
      <input
        id="qty"
        type="number"
        onChange={(e) => handleQtyInput(e)}
        value={inputQty}
        min={min}
        max={max}
        step={step}
        className={css}
      />
      <button
        className="bg-gray-200 inline"
        onClick={() => handleQtyNumber("+")}
      >
        +
      </button>
    </div>
  );
};

export default QtyHandler;
