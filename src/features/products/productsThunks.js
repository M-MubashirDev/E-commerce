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
        ...(searchQuery && { title: searchQuery }),
        ...(priceMin > 0 && { price_min: priceMin }),
        ...(priceMax !== Infinity && { price_max: priceMax }),
        ...(categoryId && { categoryId }),
      };

      // Get products from API
      const response = await getProducts(params);

      // Sort products client-side since API doesn't support sorting
      let sortedItems = [...response.items];

      if (sortBy === "price-low") {
        sortedItems.sort((a, b) => (a.price || 0) - (b.price || 0));
      } else if (sortBy === "price-high") {
        sortedItems.sort((a, b) => (b.price || 0) - (a.price || 0));
      } else if (sortBy === "name") {
        sortedItems.sort((a, b) =>
          (a.title || "").localeCompare(b.title || "")
        );
      }

      return {
        ...response,
        items: sortedItems,
      };
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
