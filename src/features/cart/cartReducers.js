import { calculateTotals } from "../../utilities/CalculatePrice";

export function setCartItemReducer(state, action) {
  const id = String(action.payload.id);
  const existingItem = state.cart.items.find((val) => String(val.id) === id);
  if (
    existingItem.quantity &&
    existingItem.currentQuantity >= existingItem.quantity
  )
    return state;
  if (existingItem) {
    existingItem.currentQuantity += 1;
  } else {
    state.cart.items.push({
      ...action.payload,
      id, // ensure string
      currentQuantity: 1,
    });
  }

  calculateTotals(state.cart);
}

export function setDescreaseCartItemReducer(state, action) {
  const id = String(action.payload.id);
  const existingItem = state.cart.items.find((val) => String(val.id) === id);

  if (existingItem && existingItem.currentQuantity > 1) {
    existingItem.currentQuantity -= 1;
  } else {
    state.cart.items = state.cart.items.filter((val) => String(val.id) !== id);
  }

  calculateTotals(state.cart);
}

export function getSingleCartItem(state, action) {
  const existingItem = state.cart.items.find(
    (val) => val.id === action.payload.id
  );
  if (existingItem) {
    state.singleCart = existingItem;
  }
}

export function clearCartReducer(state) {
  state.cart = {
    items: [],
    total: 0,
    quantity: 0,
    itemCount: 0,
    shipping: 0,
    tax: 0,
  };
  state.singleCart = null;
}
