import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  accessToken: null,
  loading: false,
  error: null,
  requiresVerification: false,
  pendingEmail: null,
  resetOTP: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.loading = false;
      state.error = null;
      state.requiresVerification = false;
      state.pendingEmail = null;
      state.resetOTP = null;
      localStorage.removeItem("authToken");
    },
    clearError: (state) => {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      // Signup
      .addCase("auth/signup/pending", (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase("auth/signup/fulfilled", (state, action) => {
        state.loading = false;
        state.requiresVerification = action.payload.requiresVerification;
        state.pendingEmail = action.payload.email;
      })
      .addCase("auth/signup/rejected", (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Verify OTP
      .addCase("auth/verifyOTP/pending", (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase("auth/verifyOTP/fulfilled", (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.requiresVerification = false;
        state.pendingEmail = null;
      })
      .addCase("auth/verifyOTP/rejected", (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Resend Email
      .addCase("auth/resendEmail/pending", (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase("auth/resendEmail/fulfilled", (state) => {
        state.loading = false;
      })
      .addCase("auth/resendEmail/rejected", (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Login
      .addCase("auth/login/pending", (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase("auth/login/fulfilled", (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
      })
      .addCase("auth/login/rejected", (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Validate Token
      .addCase("auth/validate/pending", (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase("auth/validate/fulfilled", (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
      })
      .addCase("auth/validate/rejected", (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.user = null;
        state.accessToken = null;
      })

      // Get User Profile
      .addCase("auth/profile/pending", (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase("auth/profile/fulfilled", (state, action) => {
        state.loading = false;
        state.user = { ...state.user, ...action.payload };
      })
      .addCase("auth/profile/rejected", (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Forgot Password
      .addCase("auth/forgotPassword/pending", (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase("auth/forgotPassword/fulfilled", (state, action) => {
        state.loading = false;
        state.pendingEmail = action.payload.email;
      })
      .addCase("auth/forgotPassword/rejected", (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Verify Forgot Password OTP
      .addCase("auth/verifyForgotPasswordOTP/pending", (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase("auth/verifyForgotPasswordOTP/fulfilled", (state, action) => {
        state.loading = false;
        state.resetOTP = action.payload.otp;
      })
      .addCase("auth/verifyForgotPasswordOTP/rejected", (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Change Forgot Password
      .addCase("auth/changeForgotPassword/pending", (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase("auth/changeForgotPassword/fulfilled", (state) => {
        state.loading = false;
        state.resetOTP = null;
        state.pendingEmail = null;
      })
      .addCase("auth/changeForgotPassword/rejected", (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update Profile
      .addCase("auth/updateProfile/pending", (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase("auth/updateProfile/fulfilled", (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase("auth/updateProfile/rejected", (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Change Password
      .addCase("auth/changePassword/pending", (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase("auth/changePassword/fulfilled", (state) => {
        state.loading = false;
      })
      .addCase("auth/changePassword/rejected", (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete Account
      .addCase("auth/deleteAccount/pending", (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase("auth/deleteAccount/fulfilled", (state) => {
        state.loading = false;
        state.user = null;
        state.accessToken = null;
        state.requiresVerification = false;
        state.pendingEmail = null;
        state.resetOTP = null;
      })
      .addCase("auth/deleteAccount/rejected", (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get All Users (Admin)
      .addCase("auth/getAllUsers/pending", (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase("auth/getAllUsers/fulfilled", (state, action) => {
        state.loading = false;
        state.usersList = action.payload.rows;
        state.totalUsers = action.payload.count;
      })
      .addCase("auth/getAllUsers/rejected", (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
