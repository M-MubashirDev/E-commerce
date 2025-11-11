import { createAsyncThunk } from "@reduxjs/toolkit";
import { getCategories } from "./catApi";

// ✅ Fetch categories thunk
export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async (filters, { rejectWithValue }) => {
    try {
      const allFetchedCategories = await getCategories(filters);
      return allFetchedCategories;
    } catch (error) {
      const backendMessage = error.response?.data?.message;
      return rejectWithValue(backendMessage || error.message);
    }
  }
);
