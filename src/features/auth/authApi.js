import axios from "axios";

const API_URL = "https://api.escuelajs.co/api/v1/auth";

export const loginApi = async (email, password) => {
  const res = await axios.post(`${API_URL}/login`, { email, password });
  return res.data;
};

export const fetchProfileApi = async (accessToken) => {
  const res = await axios.get(`${API_URL}/profile`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return res.data;
};
