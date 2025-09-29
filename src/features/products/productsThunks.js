import { createAsyncThunk } from "@reduxjs/toolkit";
import { getProduct, getProducts } from "./apiProduct";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (_, { rejectWithValue }) => {
    try {
      const data = await getProducts();
      return data;
    } catch (error) {
      const backendMessage = error.response?.data?.message;
      return rejectWithValue(backendMessage || error.message);
    }
  }
);
export const fetchProduct = createAsyncThunk(
  "products/fetchProduct",
  async (id, { rejectWithValue }) => {
    try {
      const data = await getProduct(id);
      return data;
    } catch (error) {
      const backendMessage = error.response?.data?.message;
      return rejectWithValue(backendMessage || error.message);
    }
  }
);
