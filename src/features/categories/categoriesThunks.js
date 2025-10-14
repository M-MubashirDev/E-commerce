import { createAsyncThunk } from "@reduxjs/toolkit";
import { getCategories } from "./catApi";

// ✅ Fetch categories thunk
export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async (_, { rejectWithValue }) => {
    try {
      const allFetchedCategories = await getCategories();

      const uniqueCategories = Array.from(
        new Map(allFetchedCategories.map((c) => [c.name, c])).values()
      );

      const limitedCategories = uniqueCategories.slice(0, 12);

      return limitedCategories;
    } catch (error) {
      const backendMessage = error.response?.data?.message;
      return rejectWithValue(backendMessage || error.message);
    }
  }
);
