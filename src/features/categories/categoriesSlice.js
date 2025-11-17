import { createSlice } from "@reduxjs/toolkit";

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
      .addCase("categories/fetchCategories/pending", (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase("categories/fetchCategories/fulfilled", (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase("categories/fetchCategories/rejected", (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      //add
      .addCase("categories/addCategory/pending", (state) => {
        state.loading = true;
      })
      .addCase("categories/addCategory/fulfilled", (state) => {
        state.loading = false;
      })
      .addCase("categories/addCategory/rejected", (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      //update
      .addCase("categories/updateCategory/pending", (state) => {
        state.loading = true;
      })
      .addCase("categories/updateCategory/fulfilled", (state) => {
        state.loading = false;
      })
      .addCase("categories/updateCategory/rejected", (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      //delete
      .addCase("categories/deleteCategory/pending", (state) => {
        state.loading = true;
      })
      .addCase("categories/deleteCategory/fulfilled", (state) => {
        state.loading = false;
      })
      .addCase("categories/deleteCategory/rejected", (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setCategory } = categoriesSlice.actions;
export default categoriesSlice.reducer;
