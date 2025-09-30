import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import categoriesReducer from "./features/categories/categoriesSlice";
import productReducer from "./features/products/productSlice";
import cartReducer from "./features/cart/cartSlice";
import {
  saveAuthData,
  clearAuthData,
  loadAuthData,
} from "./utilities/LocalStorage";

// Load everything (tokens + user) at startup
const { accessToken, refreshToken, user } = loadAuthData();

const preloadedState = {
  auth: {
    accessToken,
    refreshToken,
    user,
    loading: false,
    error: null,
  },
};

export const store = configureStore({
  reducer: {
    auth: authReducer,
    categories: categoriesReducer,
    products: productReducer,
    cart: cartReducer,
  },
  preloadedState,
});

// Subscribe to store changes
store.subscribe(() => {
  const state = store.getState();
  if (state.auth.accessToken && state.auth.refreshToken) {
    saveAuthData({
      accessToken: state.auth.accessToken,
      refreshToken: state.auth.refreshToken,
      user: state.auth.user,
    });
  } else {
    clearAuthData();
  }
});
