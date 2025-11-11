import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getCategories } from "./catApi";

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

// ✅ Add category
export const addCategory = createAsyncThunk(
  "categories/addCategory",
  async (newCategory, { rejectWithValue }) => {
    try {
      const token = getAuthToken();
      const { data } = await axios.post(
        "http://localhost:3002/api/product/category/add",
        newCategory,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      return data;
    } catch (error) {
      const backendMessage = error.response?.data?.message;
      return rejectWithValue(backendMessage || error.message);
    }
  }
);

// ✅ Update category
export const updateCategory = createAsyncThunk(
  "categories/updateCategory",
  async ({ id, updates }, { rejectWithValue }) => {
    try {
      const token = getAuthToken();
      const { data } = await axios.put(
        `http://localhost:3002/api/product/category/update/${id}`,
        updates,
        {
          headers: {
            Authorization: token,
          },
        }
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
      const token = getAuthToken();
      console.log(token, id);
      const { data } = await axios.put(
        `http://localhost:3002/api/product/category/delete/${id}`,
        {},
        {
          headers: {
            Authorization: token,
          },
        }
      );
      return data;
    } catch (error) {
      const backendMessage = error.response?.data?.message;
      return rejectWithValue(backendMessage || error.message);
    }
  }
);
