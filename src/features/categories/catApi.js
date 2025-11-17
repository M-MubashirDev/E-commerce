import axios from "axios";

const BASE_URL = "http://localhost:3002/api/product/category/view";

export const getCategories = async (filters) => {
  const response = await axios.post(BASE_URL, filters);
  return response.data.result;
};
