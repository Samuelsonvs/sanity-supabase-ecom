import { updater } from "@/utils/supabaseClient";
import { Auth } from "@/interfaces/auth";
import { BASKET_TABLE } from "@/constants/dbTables";

export const UseBasket = async ({
  _id,
  isVariant,
  count,
  method,
  user,
  basket,
  setBasket,
}: Auth.UseBasket) => {
  let result = null;
  let isList = null;
  let updateCount = null;
  let updateBasket = null;
  let basketFirstItem = null;
  if (basket) {
    let isProduct: Auth.Basket[] = [];
    let newBasket: Auth.Basket[] = [];
    if (method === "REMOVE") {
      const filtered = basket.filter((product) => product._id !== _id);
      isList = filtered.length > 0 ? [...filtered] : null;
      const { error } = await updater(user.id, isList, BASKET_TABLE);
      result = error;
    } else {
      basket.forEach((product) => {
        product._id === _id ? isProduct.push(product) : newBasket.push(product);
      });
      if (isProduct.length > 0) {
        const totalCount =
          method === "UPDATE" ? count : isProduct[0].count + count;
        updateCount = [...newBasket, { _id, isVariant, count: totalCount }];
        const { error } = await updater(user.id, updateCount, BASKET_TABLE);
        result = error;
      } else {
        updateBasket = [...basket, { _id, isVariant, count }];
        const { error } = await updater(user.id, updateBasket, BASKET_TABLE);
        result = error;
      }
    }
  } else {
    basketFirstItem = [{ _id, isVariant, count }];
    const { error } = await updater(user.id, basketFirstItem, BASKET_TABLE);
    result = error;
  }

  if (!result) {
    setBasket(isList ?? updateCount ?? updateBasket ?? basketFirstItem);
  }

  return {
    result,
  };
};

export default UseBasket;
