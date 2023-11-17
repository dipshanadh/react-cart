import {
  CLEAR_CART,
  REMOVE_ITEM,
  INCREASE_ITEM,
  DECREASE_ITEM,
  DISPLAY_ITEMS,
  LOADING,
} from "./actions";

export const reducer = (state, action) => {
  const { type, payload } = action;

  const newCart = new Map(state.cart);

  switch (type) {
    case CLEAR_CART:
      return {
        ...state,
        cart: new Map(),
      };

    case REMOVE_ITEM:
      newCart.delete(payload.id);

      return {
        ...state,
        cart: newCart,
      };

    case INCREASE_ITEM:
      const itemToIncrease = newCart.get(payload.id);

      newCart.set(payload.id, {
        ...itemToIncrease,
        amount: itemToIncrease.amount + 1,
      });

      return {
        ...state,
        cart: newCart,
      };

    case DECREASE_ITEM:
      const itemToDecrease = newCart.get(payload.id);

      if (itemToDecrease.amount === 1) {
        newCart.delete(payload.id);
      } else {
        newCart.set(payload.id, {
          ...itemToDecrease,
          amount: itemToDecrease.amount - 1,
        });
      }

      return {
        ...state,
        cart: newCart,
      };

    case LOADING:
      return {
        ...state,
        loading: true,
      };

    case DISPLAY_ITEMS:
      return {
        ...state,
        loading: false,
        cart: new Map(payload.cart.map(item => [item.id, item])),
      };

    default:
      throw new Error(`No matching action type: ${type}`);
  }
};
