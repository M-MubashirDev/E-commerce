import axios from "axios";

const BASE_URL = "https://api.escuelajs.co/api/v1/products";

export const getProducts = async (limit = 50) => {
  const { data } = await axios.get(`${BASE_URL}?limit=${limit}`);
  return data;
};
export const getProduct = async (id) => {
  const { data } = await axios.get(`${BASE_URL}/${id}`);
  return data;
};
