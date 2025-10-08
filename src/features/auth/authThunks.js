import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://api.escuelajs.co/api/v1";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${API_URL}/auth/login`, {
        email,
        password,
      });
      const { access_token, refresh_token } = res.data;
      const userRes = await axios.get(`${API_URL}/auth/profile`, {
        headers: { Authorization: `Bearer ${access_token}` },
      });
      return {
        user: userRes.data,
        accessToken: access_token,
        refreshToken: refresh_token,
      };
    } catch (error) {
      const backendMessage = error.response?.data?.message;
      return rejectWithValue(backendMessage || error.message);
    }
  }
);

export const uploadFile = createAsyncThunk(
  "auth/uploadFile",
  async (file, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await axios.post(`${API_URL}/files/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data;
    } catch (error) {
      const backendMessage = error.response?.data?.message;
      return rejectWithValue(backendMessage || error.message);
    }
  }
);

export const signupUser = createAsyncThunk(
  "auth/signupUser",
  async ({ name, email, password, avatar }, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${API_URL}/users/`, {
        name,
        email,
        password,
        avatar,
      });
      return res.data;
    } catch (error) {
      const backendMessage = error.response?.data?.message;
      return rejectWithValue(backendMessage || error.message);
    }
  }
);

export const checkEmailAvailability = createAsyncThunk(
  "auth/checkEmailAvailability",
  async ({ email }, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${API_URL}/users/is-available`, { email });
      console.log(res);
      return res.data;
    } catch (error) {
      const backendMessage = error.response?.data?.message;
      return rejectWithValue(backendMessage || error.message);
    }
  }
);
