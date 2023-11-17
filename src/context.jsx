import { useContext, useReducer, useEffect, createContext } from "react";

import cartItems from "./data";
import { reducer } from "./reducer";
import {
  CLEAR_CART,
  REMOVE_ITEM,
  INCREASE_ITEM,
  DECREASE_ITEM,
  DISPLAY_ITEMS,
  LOADING,
} from "./actions";
import { getTotals } from "./utils";

const url = "https://www.course-api.com/react-useReducer-cart-project";

const AppContext = createContext();

const initialState = {
  loading: true,
  cart: new Map(cartItems.map(item => [item.id, item])),
};

export const AppProvider = props => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [totalItems, totalCost] = getTotals(state.cart);

  const clearCart = () => {
    dispatch({ type: CLEAR_CART });
  };

  const removeItem = id => {
    dispatch({ type: REMOVE_ITEM, payload: { id } });
  };

  const increaseItem = id => {
    dispatch({ type: INCREASE_ITEM, payload: { id } });
  };

  const decreaseItem = id => {
    dispatch({ type: DECREASE_ITEM, payload: { id } });
  };

  const fetchData = async () => {
    dispatch({ type: LOADING });

    const res = await fetch(url);
    const data = await res.json();

    dispatch({ type: DISPLAY_ITEMS, payload: { cart: data } });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <AppContext.Provider
      value={{
        ...state,
        clearCart,
        removeItem,
        increaseItem,
        decreaseItem,
        totalItems,
        totalCost,
      }}>
      {props.children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
