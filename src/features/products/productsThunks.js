// src/redux/thunks/productThunks.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import { adminApi } from "../../utilities/axiosInspector";
import { getProducts, getProduct } from "../products/apiProduct";

// ✅ Get all products
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (filters, { rejectWithValue }) => {
    try {
      const response = await getProducts(filters);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// ✅ Get single product by ID
export const fetchProductById = createAsyncThunk(
  "products/fetchProductById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await getProduct(id);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
// const BASE_URL = "";
//................
export const addProduct = createAsyncThunk(
  "products/addProduct",
  async (formData, { rejectWithValue }) => {
    try {
      const { data } = await adminApi.post(`/product/add`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return data.result;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const { data } = await adminApi.put(`/product/update/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return data.result;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (id, { rejectWithValue }) => {
    try {
      await adminApi.put(`/product/delete/${id}`, {});
      return { id };
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
