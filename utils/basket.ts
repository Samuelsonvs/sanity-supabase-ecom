import { setUserBasket } from "@/utils/supabaseClient";
import { Dispatch, SetStateAction } from "react";
import { User } from "@supabase/supabase-js";
import { Auth } from "@/interfaces/auth"

interface Prop {
    user: User;
    basket: Auth.Basket[] | null
    setBasket: Dispatch<SetStateAction<Auth.Basket[] | null>>
}

interface PropElem {
    _id: string;
    isVariant: string | null;
    count: number
}

export const UseBasket = async({_id, isVariant, count}: PropElem, { user, basket, setBasket }: Prop) => {
    let result = null
    if (basket) {
        const { error } = await setUserBasket(user, [...basket,{_id, isVariant, count}])
        if (!error) {
        setBasket([...basket,{_id, isVariant, count}])
        } else {
            result = error
        }
    } else {
        const { error } = await setUserBasket(user, [{_id, isVariant, count}])
        if (!error) {
        setBasket([{_id, isVariant, count}])
        } else {
            result = error
        }
    }
      
  return {
      result
  }
};

export default UseBasket;
