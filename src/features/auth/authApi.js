import axios from "axios";

const API_URL = "http://localhost:3002/api/user";

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
export const createUser = async ({ name, email, password }) => {
  const res = await axios.post(`${API_URL}/signup`, {
    name,
    email,
    password,
  });
  return res.data;
};
