import { adminApi } from "../../utilities/axiosInspector";

export const getCategories = async (filters) => {
  const response = await adminApi.post("/product/category/view", filters);
  return response.data.result;
};
