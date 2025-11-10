import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchStats = createAsyncThunk(
  "stats/fetchStats",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.get("http://localhost:3002/api/stats/all", {
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      });
      return response.data.result;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch stats"
      );
    }
  }
);
