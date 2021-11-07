import { setUserBasket } from "@/utils/supabaseClient";
import { Auth } from "@/interfaces/auth";

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
  if (basket) {
    let isProduct: Auth.Basket[] = [];
    let newBasket: Auth.Basket[] = [];
    if (method === 'REMOVE') {
      const filtered = basket.filter((product) => {
        return (
          product._id !== _id
        )
      });
      const { error } = await setUserBasket(user, [
        ...filtered,
      ]);
      if (!error) {
        setBasket([...filtered]);
      } else {
        result = error;
      }
    } else {
      basket.forEach((product) => {
        product._id === _id ? isProduct.push(product) : newBasket.push(product);
      });
      if (isProduct.length > 0) {
        const totalCount = method === 'UPDATE' ? count : isProduct[0].count + count;
        const { error } = await setUserBasket(user, [
          ...newBasket,
          { _id, isVariant, count: totalCount },
        ]);
        if (!error) {
          setBasket([...newBasket, { _id, isVariant, count: totalCount }]);
        } else {
          result = error;
        }
      } else {
        const { error } = await setUserBasket(user, [
          ...basket,
          { _id, isVariant, count },
        ]);
        if (!error) {
          setBasket([...basket, { _id, isVariant, count }]);
        } else {
          result = error;
        }
      }
    }
  } else {
    const { error } = await setUserBasket(user, [{ _id, isVariant, count }]);
    if (!error) {
      setBasket([{ _id, isVariant, count }]);
    } else {
      result = error;
    }
  }

  return {
    result,
  };
};

export default UseBasket;
