import { adminApi } from "../../utilities/axiosInspector";
import { createAsyncThunk } from "@reduxjs/toolkit";

// Login User
export const loginUserAdmin = createAsyncThunk(
  "adminAuth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await adminApi.post("/user/login", { email, password });

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
  "adminAuth/signup",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await adminApi.post("/user/signup", {
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
  "adminAuth/updateAdminName",
  async (newName, { rejectWithValue }) => {
    try {
      const response = await adminApi.put("/user/update", { name: newName });
      return response.data.result.user;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.data.message
      );
    }
  }
);
