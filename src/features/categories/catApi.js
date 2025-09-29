import axios from "axios";

const BASE_URL = "https://api.escuelajs.co/api/v1/categories";

export const getCategories = async () => {
  const response = await axios.get(BASE_URL);
  return response.data;
};
