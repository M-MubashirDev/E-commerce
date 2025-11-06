import { createAsyncThunk } from "@reduxjs/toolkit";
import { getCategories } from "./catApi";

// ✅ Fetch categories thunk
export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async (_, { rejectWithValue }) => {
    try {
      const allFetchedCategories = await getCategories();
      return allFetchedCategories;
    } catch (error) {
      const backendMessage = error.response?.data?.message;
      return rejectWithValue(backendMessage || error.message);
    }
  }
);
