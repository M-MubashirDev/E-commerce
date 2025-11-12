import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getAuthToken } from "../categories/categoriesThunks";

export const createOrder = createAsyncThunk(
  "order/createOrder",
  async (orderData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("authToken");

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };

      const response = await axios.post(
        "http://localhost:3002/api/order/add",
        orderData,
        config
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create order"
      );
    }
  }
);
export const fetchUserOrders = createAsyncThunk(
  "orders/fetchUserOrders",
  async ({ page = 0, limit = 10 }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("authToken");

      const response = await axios.post(
        "http://localhost:3002/api/order/history",
        { page, limit },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      return response.data.result;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch orders"
      );
    }
  }
);

// ✅ Update an order (admin only)
export const updateOrder = createAsyncThunk(
  "orders/updateOrder",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const token = getAuthToken();
      const response = await axios.post(
        `http://localhost:3002/api/order/update/${id}`,
        data,
        {
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        }
      );

      return response.data.result; // { message: "Successfully updated" }
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update order"
      );
    }
  }
);

// ✅ Delete an order (admin only)
export const deleteOrder = createAsyncThunk(
  "orders/deleteOrder",
  async (id, { rejectWithValue }) => {
    try {
      const token = getAuthToken();

      const response = await axios.delete(
        `http://localhost:3002/api/order/delete/${id}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      return response.data.result; // { message: "Order Deleted Successfully" }
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete order"
      );
    }
  }
);
// src/features/orders/orderThunks.js
export const fetchOrders = createAsyncThunk(
  "orders/fetchOrders",
  async ({ page = 0, limit = 10, address = "" }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("authToken");
      const obj = address.length ? { page, limit, address } : { page, limit };
      const response = await axios.post(
        "http://localhost:3002/api/order/list",
        obj,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      return response.data.result; // { count, rows }
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch orders"
      );
    }
  }
);
