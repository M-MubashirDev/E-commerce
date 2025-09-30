import { calculateTotals } from "../../utilities/CalculatePrice";

export function setCartItemReducer(state, action) {
  const existingItem = state.cart.items.find(
    (val) => val.id === action.payload.id
  );

  if (existingItem) {
    existingItem.currentQuantity += 1;
  } else {
    state.cart.items.push({
      ...action.payload,
      currentQuantity: 1,
    });
  }
  calculateTotals(state.cart);
}

export function setDescreaseCartItemReducer(state, action) {
  const existingItem = state.cart.items.find(
    (val) => val.id === action.payload.id
  );
  if (existingItem && existingItem.currentQuantity > 1) {
    existingItem.currentQuantity -= 1;
  } else {
    state.cart.items = state.cart.items.filter(
      (val) => val.id !== action.payload.id
    );
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
