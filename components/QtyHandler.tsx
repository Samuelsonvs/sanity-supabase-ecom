import React, { ChangeEvent } from 'react';
import { Dispatch, SetStateAction } from "react";

interface Params {
    setter: Dispatch<SetStateAction<number | null>> | (() => number);
    inputQty: number;
    qty: number;
    min: number;
    max: number;
    step: number;
    css: string;
    containerCss: string;
}

const QtyHandler = ({setter, inputQty, qty, min, max, step, css, containerCss}:Params) => {

    const handleQtyInput = (e: ChangeEvent<HTMLInputElement>) => {
        const number = Number(e.target.value) > qty ? qty : Number(e.target.value);
        setter(number);
    };

    const handleQtyNumber = (operator: string) => {
        if (operator === "+") {
          const number = inputQty === qty ? inputQty : inputQty + 1;
          setter(number);
        } else {
          if (operator === "-") {
            const number = inputQty === 1 ? inputQty : inputQty - 1;
            setter(number);
          } else {
            console.log("Undefined operator.");
          }
        }
      };

    return (
        <div className={containerCss}>
            <button onClick={() => handleQtyNumber("-")}>-</button>
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
            <button onClick={() => handleQtyNumber("+")}>+</button>
      </div>
    )
}

export default QtyHandler;