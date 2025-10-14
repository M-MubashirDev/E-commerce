import { createSlice } from "@reduxjs/toolkit";
import {
  clearCartReducer,
  getSingleCartItem,
  setCartItemReducer,
  setDescreaseCartItemReducer,
} from "./cartReducers";

const initialState = {
  cart: { items: [], total: 0, quantity: 0, itemCount: 0, shipping: 0, tax: 0 },
  singleCart: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCartItem: setCartItemReducer,
    setReduceItem: setDescreaseCartItemReducer,
    getSingleCartItem: getSingleCartItem,
    clearCart: clearCartReducer,
  },
});

export const { setCartItem, setReduceItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
