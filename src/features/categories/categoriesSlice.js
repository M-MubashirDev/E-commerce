import { createSlice } from "@reduxjs/toolkit";
import { fetchCategories } from "./categoriesThunks";

const initialState = {
  categories: {
    count: 0,
    rows: [],
  },
  selectedCategory: "All",
  loading: false,
  error: null,
};

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    setCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setCategory } = categoriesSlice.actions;
export default categoriesSlice.reducer;
