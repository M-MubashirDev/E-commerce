import { createAsyncThunk } from "@reduxjs/toolkit";
import { getCategories } from "./catApi";
import { adminApi } from "../../utilities/axiosInspector";

// ✅ Helper to get the Bearer token from localStorage
export const getAuthToken = () => {
  try {
    const authData = JSON.parse(localStorage.getItem("persist:adminAuth"));
    if (!authData) return null;

    const parsedToken = JSON.parse(authData.accessToken || "null");
    return parsedToken ? `Bearer ${parsedToken}` : null;
  } catch {
    return null;
  }
};

// ✅ Fetch categories
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
//below here do this
// ✅ Add category
export const addCategory = createAsyncThunk(
  "categories/addCategory",
  async (newCategory, { rejectWithValue }) => {
    try {
      const { data } = await adminApi.post(
        "/product/category/add",
        newCategory
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// ✅ Update category
export const updateCategory = createAsyncThunk(
  "categories/updateCategory",
  async ({ id, updates }, { rejectWithValue }) => {
    try {
      const { data } = await adminApi.put(
        `/product/category/update/${id}`,
        updates
      );
      return data;
    } catch (error) {
      const backendMessage = error.response?.data?.message;
      return rejectWithValue(backendMessage || error.message);
    }
  }
);

// ✅ Delete category
export const deleteCategory = createAsyncThunk(
  "categories/deleteCategory",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await adminApi.put(`/product/category/delete/${id}`, {});
      return data;
    } catch (error) {
      const backendMessage = error.response?.data?.message;
      return rejectWithValue(backendMessage || error.message);
    }
  }
);
