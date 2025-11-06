import { createSlice } from "@reduxjs/toolkit";
import { fetchProducts, fetchProductById } from "../products/productsThunks";

const initialState = {
  items: [],
  total: 0,
  maxPrice: 2000,
  minPrice: 0,
  selectedProduct: null,
  loading: false,
  error: null,
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.items;
        state.maxPrice = action.payload.maxPrice;
        state.minPrice = action.payload.minPrice;
        state.total = action.payload.total;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.selectedProduct = action.payload;
      });
  },
});

export default productSlice.reducer;
