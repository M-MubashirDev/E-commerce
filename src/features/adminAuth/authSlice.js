import { createSlice } from "@reduxjs/toolkit";

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
      .addCase("adminAuth/login/pending", (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase("adminAuth/login/fulfilled", (state, action) => {
        state.loading = false;
        state.userAdmin = action.payload.userAdmin;
        state.accessToken = action.payload.accessToken;
        state.error = null;
      })
      .addCase("adminAuth/login/rejected", (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to log in";
      });

    builder
      .addCase("adminAuth/updateAdminName/pending", (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase("adminAuth/updateAdminName/fulfilled", (state, action) => {
        state.loading = false;
        state.userAdmin = action.payload;
      })
      .addCase("adminAuth/updateAdminName/rejected", (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase("adminAuth/signup/pending", (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase("adminAuth/signup/fulfilled", (state, action) => {
        state.loading = false;
        state.pendingEmail = action.payload.email;
        state.error = null;
      })
      .addCase("adminAuth/signup/rejected", (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to sign up";
      });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
