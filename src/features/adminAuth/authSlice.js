import { createSlice } from "@reduxjs/toolkit";
import { loginUserAdmin, signupAdmin, updateAdminName } from "./authThunks";

const initialState = {
  userAdmin: null,
  accessToken: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.userAdmin = null;
      state.accessToken = null;
      state.loading = false;
      state.error = null;
      state.pendingEmail = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(loginUserAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUserAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.userAdmin = action.payload.userAdmin;
        state.accessToken = action.payload.accessToken;
        state.error = null;
      })
      .addCase(loginUserAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to log in";
      });

    builder
      .addCase(signupAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.pendingEmail = action.payload.email;
        state.error = null;
      })
      .addCase(signupAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to sign up";
      })
      .addCase(updateAdminName.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateAdminName.fulfilled, (state, action) => {
        state.loading = false;
        state.userAdmin = action.payload;
      })
      .addCase(updateAdminName.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to update admin name";
      });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
