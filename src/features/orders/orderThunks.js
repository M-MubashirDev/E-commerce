import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { adminApi } from "../../utilities/axiosInspector";

export const createOrder = createAsyncThunk(
  "order/createOrder",
  async (orderData, { rejectWithValue }) => {
    try {
      const response = await adminApi.post("/order/add", orderData);

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error?.data?.message
      );
    }
  }
);

//>>>>>>>>>>user
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

export const updateOrder = createAsyncThunk(
  "orders/updateOrder",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await adminApi.post(`/order/update/${id}`, data);

      return response.data.result;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error?.data.message
      );
    }
  }
);

export const deleteOrder = createAsyncThunk(
  "orders/deleteOrder",
  async (id, { rejectWithValue }) => {
    try {
      const response = await adminApi.delete(`/order/delete/${id}`);

      return response.data.result;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.data.message
      );
    }
  }
);
// src/features/orders/orderThunks.js
export const fetchOrders = createAsyncThunk(
  "orders/fetchOrders",
  async ({ page = 0, limit = 10, address = "" }, { rejectWithValue }) => {
    try {
      const obj = address.length ? { page, limit, address } : { page, limit };
      const response = await adminApi.post("/order/list", obj);

      return response.data.result;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error?.data.message
      );
    }
  }
);

export const fetchOrderDetails = createAsyncThunk(
  "orders/fetchOrderDetails",
  async (orderId, { rejectWithValue }) => {
    try {
      const response = await adminApi.get(`/order/orderDetails/${orderId}`);

      return response.data.result;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.data.message
      );
    }
  }
);
