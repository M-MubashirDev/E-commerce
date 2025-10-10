import { createAsyncThunk } from "@reduxjs/toolkit";
import { getProducts, getProduct } from "./apiProduct";

// Fetch paginated products with filters
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (
    {
      limit = 14,
      offset = 0,
      searchQuery = "",
      priceMin = 0,
      priceMax = Infinity,
      categoryId = null,
      sortBy = "name",
    },
    { rejectWithValue }
  ) => {
    try {
      const params = {
        limit,
        offset,
        ...(searchQuery && { title: searchQuery }), // Filter by title
        ...(priceMin !== 0 && { price_min: priceMin }), // Filter by price min
        ...(priceMax !== Infinity && { price_max: priceMax }), // Filter by price max
        ...(categoryId && { categoryId }), // Filter by category ID
      };

      // Handle sorting
      if (sortBy === "price-low") params.sort = "price";
      else if (sortBy === "price-high") params.sort = "-price";

      const response = await getProducts(params);
      return response;
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
