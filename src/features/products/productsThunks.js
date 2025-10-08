import { createAsyncThunk } from "@reduxjs/toolkit";
import { getProducts, getProduct } from "./apiProduct";

// Fetch paginated products
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async ({ limit = 14, offset = 0 }, { rejectWithValue }) => {
    try {
      return await getProducts({ limit, offset });
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Fetch single product
export const fetchProduct = createAsyncThunk(
  "products/fetchProduct",
  async (id, { rejectWithValue }) => {
    try {
      return await getProduct(id);
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
