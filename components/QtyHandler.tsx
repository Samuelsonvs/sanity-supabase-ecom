import React, { ChangeEvent } from 'react';
import { App } from "@/interfaces/app"

const QtyHandler = ({setter, inputQty, qty, min, max, step, css, containerCss, _id, isVariant}: App.QtyHandler) => {
    const handleQtyInput = (e: ChangeEvent<HTMLInputElement>) => {
        const number = Number(e.target.value) > qty ? qty : Number(e.target.value);
        setter(number);
    };

    const handleQtyNumber = (operator: string) => {
        if (operator === "+") {
          const number = inputQty === qty ? inputQty : inputQty + 1;
          console.log(number)
          if(_id) {
            setter(number, _id, isVariant)
          } else {
              setter(number);
          };
        } else {
          if (operator === "-") {
            const number = inputQty === 1 ? inputQty : inputQty - 1;
            console.log(number)
            if(_id) {
                setter(number, _id, isVariant)
            } else {
                setter(number);
            };
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