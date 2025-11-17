import axios from "axios";
import { store } from "../store";
import { logout as userLogout } from "../features/auth/authSlice";
import { logout as adminLogout } from "../features/adminAuth/authSlice";
import { getAuthAdminToken, getAuthToken } from "./getAuth";

const API_BASE_URL = "http://localhost:3002/api";

// ============== USER API INSTANCE ==============
export const userApi = axios.create({
  baseURL: `${API_BASE_URL}`,
  headers: {
    "Content-Type": "application/json",
  },
});

userApi.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

userApi.interceptors.response.use(
  (response) => response,
  (error) => {
    const token = getAuthToken();
    if (error.response?.status === 401 && token) {
      store.dispatch(userLogout());
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

// ============== ADMIN API INSTANCE ==============
export const adminApi = axios.create({
  baseURL: `${API_BASE_URL}`,
  headers: {
    "Content-Type": "application/json",
  },
});

adminApi.interceptors.request.use(
  (config) => {
    const token = getAuthAdminToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

adminApi.interceptors.response.use(
  (response) => response,
  (error) => {
    const token = getAuthAdminToken();

    if (error.response?.status === 401 && token) {
      store.dispatch(adminLogout());
      window.location.href = "/login?role=admin";
    }

    return Promise.reject(error);
  }
);
