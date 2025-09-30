import { createSlice } from "@reduxjs/toolkit";
import {
  setCartItemReducer,
  setDescreaseCartItemReducer,
} from "./cartReducers";

const initialState = {
  cart: { items: [], total: 0, quantity: 0, itemCount: 0, shipping: 0, tax: 0 },
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCartItem: setCartItemReducer,
    setReduceItem: setDescreaseCartItemReducer,
  },
});

export const { setCartItem, setReduceItem } = cartSlice.actions;
export default cartSlice.reducer;
