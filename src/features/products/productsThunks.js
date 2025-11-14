// src/redux/thunks/productThunks.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getProducts, getProduct } from "../products/apiProduct";
import axios from "axios";
import { getAuthToken } from "../categories/categoriesThunks";

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
const BASE_URL = "http://localhost:3002/api/product";
//................
export const addProduct = createAsyncThunk(
  "products/addProduct",
  async (formData, { rejectWithValue }) => {
    try {
      const token = getAuthToken();

      const { data } = await axios.post(`${BASE_URL}/add`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: token,
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
      const token = getAuthToken();
      const { data } = await axios.put(`${BASE_URL}/update/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: token,
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
      const token = getAuthToken();

      await axios.put(
        `${BASE_URL}/delete/${id}`,
        {},
        {
          headers: {
            Authorization: token,
          },
        }
      );
      return { id };
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
