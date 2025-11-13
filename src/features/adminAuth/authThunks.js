import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getAuthToken } from "../categories/categoriesThunks";

const API_BASE_URL = "http://localhost:3002/api/user";

// Axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
// Login User
export const loginUserAdmin = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await api.post("/login", { email, password });

      if (response.data.statusCode === 200) {
        const { userInfo, tokenInfo } = response.data.result;
        return {
          userAdmin: userInfo,
          accessToken: tokenInfo,
        };
      }
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.data.message
      );
    }
  }
);
// Signup User
export const signupAdmin = createAsyncThunk(
  "auth/signup",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await api.post("/signup", {
        name: userData.name,
        email: userData.email,
        password: userData.password,
      });

      if (response.data.statusCode === 200) {
        return {
          userAdmin: response.data.result,
          email: userData.email,
        };
      }
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.data.message
      );
    }
  }
);
// Update Admin Name
export const updateAdminName = createAsyncThunk(
  "auth/updateAdminName",
  async (newName, { rejectWithValue }) => {
    try {
      const token = getAuthToken();
      const response = await axios.put(
        "http://localhost:3002/api/user/update",
        { name: newName },
        {
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        }
      );
      // assuming backend returns updated user info
      return response.data.result.user;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update name"
      );
    }
  }
);
