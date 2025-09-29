import { createAsyncThunk } from "@reduxjs/toolkit";
import { getCategories } from "./catApi";

// ✅ Fetch categories thunk
export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async (_, { rejectWithValue }) => {
    try {
      const data = await getCategories();
      return data;
    } catch (error) {
      const backendMessage = error.response?.data?.message;
      return rejectWithValue(backendMessage || error.message);
    }
  }
);
