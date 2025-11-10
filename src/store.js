import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage
import authReducer from "./features/auth/authSlice";
import authAdminReducer from "./features/adminAuth/authSlice";
import categoriesReducer from "./features/categories/categoriesSlice";
import productReducer from "./features/products/productSlice";
import locationReducer from "./features/location/locationSlice";
import cartReducer from "./features/cart/cartSlice";
import statsReducer from "./features/stats/statsSlice";
import orderReducer from "./features/orders/orderSlice";

const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["accessToken", "user"],
};
const authAdminPersistConfig = {
  key: "adminAuth",
  storage,
  whitelist: ["accessToken", "userAdmin"],
};

const cartPersistConfig = {
  key: "cart",
  storage,
  whitelist: ["cart"],
};

const loactionPersistConfig = {
  key: "location",
  storage,
  whitelist: ["location", "details"],
};

export const store = configureStore({
  reducer: {
    auth: persistReducer(authPersistConfig, authReducer),
    categories: categoriesReducer,
    stats: statsReducer,
    products: productReducer,
    location: persistReducer(loactionPersistConfig, locationReducer),
    cart: persistReducer(cartPersistConfig, cartReducer),
    orders: orderReducer,
    adminAuth: persistReducer(authAdminPersistConfig, authAdminReducer),
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
