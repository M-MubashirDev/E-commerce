import { createAsyncThunk } from "@reduxjs/toolkit";
import { getCategories } from "./catApi";

// ✅ Fetch categories thunk
export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async (_, { rejectWithValue }) => {
    try {
      const data = await getCategories();

      return Array.from(new Map(data.map((c) => [c.name, c])).values());
    } catch (error) {
      const backendMessage = error.response?.data?.message;
      return rejectWithValue(backendMessage || error.message);
    }
  }
);
