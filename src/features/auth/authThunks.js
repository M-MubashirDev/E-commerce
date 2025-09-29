import { createAsyncThunk } from "@reduxjs/toolkit";
import { loginApi, fetchProfileApi } from "./authApi";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const { access_token, refresh_token } = await loginApi(email, password);

      const user = await fetchProfileApi(access_token);

      return {
        user,
        accessToken: access_token,
        refreshToken: refresh_token,
      };
    } catch (error) {
      const backendMessage = error.response?.data?.message;
      return rejectWithValue(backendMessage || error.message);
    }
  }
);
