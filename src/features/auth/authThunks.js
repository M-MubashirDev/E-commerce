import { createAsyncThunk } from "@reduxjs/toolkit";
import { adminApi, userApi } from "../../utilities/axiosInspector";

// Signup User
export const signupUser = createAsyncThunk(
  "auth/signup",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await userApi.post("/client/signup", {
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
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error?.data.message
      );
    }
  }
);

// Verify OTP
export const verifyOTP = createAsyncThunk(
  "auth/verifyOTP",
  async ({ email, otp }, { rejectWithValue }) => {
    try {
      const response = await userApi.post("/client/verify", { email, otp });

      if (response.data.statusCode === 200) {
        const { clientInfo, tokenInfo } = response.data.result;
        return {
          user: clientInfo,
          accessToken: tokenInfo,
        };
      }
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error?.data.message
      );
    }
  }
);

// Resend Email
export const resendEmail = createAsyncThunk(
  "auth/resendEmail",
  async (email, { rejectWithValue }) => {
    try {
      const response = await userApi.post("/client/resend-email", { email });

      if (response.data.statusCode === 200) {
        return response.data.result.msg;
      }
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error?.data.message
      );
    }
  }
);

// Login User
export const loginUser = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await userApi.post("/client/login", { email, password });

      if (response.data.statusCode === 200) {
        const { clientInfo, tokenInfo } = response.data.result;
        return {
          user: clientInfo,
          accessToken: tokenInfo,
        };
      }
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error?.data.message
      );
    }
  }
);

// Validate Token
export const validateToken = createAsyncThunk(
  "auth/validate",
  async (_, { rejectWithValue }) => {
    try {
      const response = await userApi.post("/client/validate");

      if (response.data.statusCode === 200) {
        const { userInfo, tokenInfo } = response.data.result;
        return {
          user: userInfo,
          accessToken: tokenInfo,
        };
      }
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error?.data.message
      );
    }
  }
);

// Get User Profile
export const getUserProfile = createAsyncThunk(
  "auth/profile",
  async (email, { rejectWithValue }) => {
    try {
      const response = await userApi.post("/client/profile", { email });

      if (response.data.statusCode === 200) {
        return response.data.result;
      }
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error?.data.message
      );
    }
  }
);

// Forgot Password
export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async (email, { rejectWithValue }) => {
    try {
      const response = await userApi.post("/client/forget-password", { email });

      if (response.data.statusCode === 200) {
        return {
          user: response.data.result,
          email,
        };
      }
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error?.data.message
      );
    }
  }
);

// Verify Forgot Password OTP
export const verifyForgotPasswordOTP = createAsyncThunk(
  "auth/verifyForgotPasswordOTP",
  async ({ email, otp }, { rejectWithValue }) => {
    try {
      const response = await userApi.post("/client/verify-forget-password", {
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
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error?.data.message
      );
    }
  }
);

// Change Forgot Password
export const changeForgotPassword = createAsyncThunk(
  "auth/changeForgotPassword",
  async ({ otp, password }, { rejectWithValue }) => {
    try {
      const response = await userApi.post("/client/change-forget-password", {
        otp,
        password,
      });

      if (response.data.statusCode === 200) {
        return response.data.result;
      }
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error?.data.message
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
      const response = await userApi.put("/client/update", userData);

      if (response.data.statusCode === 200) {
        return response.data.result.user;
      }
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error?.data.message
      );
    }
  }
);

// Change Password
export const changePassword = createAsyncThunk(
  "auth/changePassword",
  async ({ oldPassword, newPassword }, { rejectWithValue }) => {
    try {
      const response = await userApi.put("/client/change-password", {
        oldPassword,
        newPassword,
      });

      if (response.data.statusCode === 200) {
        return response.data.result;
      }
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error?.data.message
      );
    }
  }
);

// Delete User Account
export const deleteUserAccount = createAsyncThunk(
  "auth/deleteAccount",
  async (_, { rejectWithValue }) => {
    try {
      const response = await userApi.delete("/client/delete");

      if (response.data.statusCode === 200) {
        return response.data.result;
      }
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error?.data.message
      );
    }
  }
);

//admin get all users and delete profile
// http://localhost:3002/api/client/view
// Get All Users (Admin)
export const getAllUsers = createAsyncThunk(
  "auth/getAllUsers",
  async ({ page = 0, limit = 10 }, { rejectWithValue }) => {
    try {
      const response = await adminApi.post("/client/view", { page, limit });

      if (response.data.statusCode === 200) {
        return response.data.result;
      }
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.response.message
      );
    }
  }
);
