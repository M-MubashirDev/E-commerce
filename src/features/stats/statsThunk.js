import { createAsyncThunk } from "@reduxjs/toolkit";
import { adminApi } from "../../utilities/axiosInspector";

export const fetchStats = createAsyncThunk(
  "stats/fetchStats",
  async (_, { rejectWithValue }) => {
    try {
      const response = await adminApi.get("/stats/all");
      return response.data.result;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.data.message
      );
    }
  }
);
