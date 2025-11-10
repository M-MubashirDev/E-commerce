import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE_URL = "http://localhost:3002/api/client";

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

// Signup User
export const signupUser = createAsyncThunk(
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
          user: response.data.result,
          email: userData.email,
          requiresVerification: true,
        };
      }
      return rejectWithValue(response.data.message || "Signup failed");
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Signup failed. Please try again."
      );
    }
  }
);

// Verify OTP
export const verifyOTP = createAsyncThunk(
  "auth/verifyOTP",
  async ({ email, otp }, { rejectWithValue }) => {
    try {
      const response = await api.post("/verify", { email, otp });

      if (response.data.statusCode === 200) {
        const { clientInfo, tokenInfo } = response.data.result;
        localStorage.setItem("authToken", tokenInfo);
        return {
          user: clientInfo,
          accessToken: tokenInfo,
        };
      }
      return rejectWithValue(response.data.message || "Verification failed");
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Verification failed. Please try again."
      );
    }
  }
);

// Resend Email
export const resendEmail = createAsyncThunk(
  "auth/resendEmail",
  async (email, { rejectWithValue }) => {
    try {
      const response = await api.post("/resend-email", { email });

      if (response.data.statusCode === 200) {
        return response.data.result.msg;
      }
      return rejectWithValue(response.data.message || "Failed to resend email");
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to resend email. Please try again."
      );
    }
  }
);

// Login User
export const loginUser = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await api.post("/login", { email, password });

      if (response.data.statusCode === 200) {
        const { clientInfo, tokenInfo } = response.data.result;
        localStorage.setItem("authToken", tokenInfo);
        return {
          user: clientInfo,
          accessToken: tokenInfo,
        };
      }
      return rejectWithValue(response.data.message || "Login failed");
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Login failed. Please try again."
      );
    }
  }
);

// Validate Token
export const validateToken = createAsyncThunk(
  "auth/validate",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.post("/validate");

      if (response.data.statusCode === 200) {
        const { userInfo, tokenInfo } = response.data.result;
        localStorage.setItem("authToken", tokenInfo);
        return {
          user: userInfo,
          accessToken: tokenInfo,
        };
      }
      return rejectWithValue(response.data.message || "Validation failed");
    } catch (error) {
      localStorage.removeItem("authToken");
      return rejectWithValue(
        error.response?.data?.message || "Session expired. Please login again."
      );
    }
  }
);

// Get User Profile
export const getUserProfile = createAsyncThunk(
  "auth/profile",
  async (email, { rejectWithValue }) => {
    try {
      const response = await api.post("/profile", { email });

      if (response.data.statusCode === 200) {
        return response.data.result;
      }
      return rejectWithValue(
        response.data.message || "Failed to fetch profile"
      );
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to fetch profile. Please try again."
      );
    }
  }
);

// Forgot Password
export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async (email, { rejectWithValue }) => {
    try {
      const response = await api.post("/forget-password", { email });

      if (response.data.statusCode === 200) {
        return {
          user: response.data.result,
          email,
        };
      }
      return rejectWithValue(
        response.data.message || "Failed to send reset email"
      );
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to send reset email. Please try again."
      );
    }
  }
);

// Verify Forgot Password OTP
export const verifyForgotPasswordOTP = createAsyncThunk(
  "auth/verifyForgotPasswordOTP",
  async ({ email, otp }, { rejectWithValue }) => {
    try {
      const response = await api.post("/verify-forget-password", {
        email,
        otp,
      });

      if (response.data.statusCode === 200) {
        const { clientInfo, tokenInfo } = response.data.result;
        return {
          user: clientInfo,
          resetToken: tokenInfo,
          otp,
        };
      }
      return rejectWithValue(response.data.message || "Verification failed");
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Verification failed. Please try again."
      );
    }
  }
);

// Change Forgot Password
export const changeForgotPassword = createAsyncThunk(
  "auth/changeForgotPassword",
  async ({ otp, password }, { rejectWithValue }) => {
    try {
      const response = await api.post("/change-forget-password", {
        otp,
        password,
      });

      if (response.data.statusCode === 200) {
        return response.data.result;
      }
      return rejectWithValue(
        response.data.message || "Failed to change password"
      );
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to change password. Please try again."
      );
    }
  }
);
// Add these new thunks to your existing authThunks.js file

// Update User Profile
export const updateUserProfile = createAsyncThunk(
  "auth/updateProfile",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await api.put("/update", userData);

      if (response.data.statusCode === 200) {
        return response.data.result.user;
      }
      return rejectWithValue(response.data.message || "Update failed");
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to update profile. Please try again."
      );
    }
  }
);

// Change Password
export const changePassword = createAsyncThunk(
  "auth/changePassword",
  async ({ oldPassword, newPassword }, { rejectWithValue }) => {
    try {
      const response = await api.put("/change-password", {
        oldPassword,
        newPassword,
      });

      if (response.data.statusCode === 200) {
        return response.data.result;
      }
      return rejectWithValue(response.data.message || "Password change failed");
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to change password. Please try again."
      );
    }
  }
);

// Delete User Account
export const deleteUserAccount = createAsyncThunk(
  "auth/deleteAccount",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.delete("/delete");

      if (response.data.statusCode === 200) {
        localStorage.removeItem("authToken");
        return response.data.result;
      }
      return rejectWithValue(
        response.data.message || "Account deletion failed"
      );
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to delete account. Please try again."
      );
    }
  }
);
