import axios from "axios";

const BASE_URL = "https://api.escuelajs.co/api/v1/products";

export const getProducts = async (params = {}) => {
  const { data, headers } = await axios.get(BASE_URL, { params });

  const totalHeader = headers["x-total-count"] || headers["X-Total-Count"];
  const total = totalHeader ? parseInt(totalHeader, 10) : 200;
  // const totalData = params;
  console.log(params);
  const maxPrice =
    data.length > 0
      ? Math.ceil(Math.max(...data.map((p) => p.price || 0)))
      : 1000;
  return { items: data, total, maxPrice };
};

// Fetch single product
export const getProduct = async (id) => {
  const { data } = await axios.get(`${BASE_URL}/${id}`);
  return data;
};
