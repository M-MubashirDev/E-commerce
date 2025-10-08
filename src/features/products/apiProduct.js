import axios from "axios";

const BASE_URL = "https://api.escuelajs.co/api/v1/products";

// Fetch paginated products
export const getProducts = async ({ limit = 14, offset = 0 }) => {
  const { data, headers } = await axios.get(BASE_URL, {
    params: { limit, offset },
  });

  // The API doesn’t always return total count, so we fallback to length
  const totalHeader = headers["x-total-count"] || headers["X-Total-Count"];
  const total = totalHeader ? parseInt(totalHeader, 10) : 200; // approximate

  return { items: data, total };
};

// Fetch single product
export const getProduct = async (id) => {
  const { data } = await axios.get(`${BASE_URL}/${id}`);
  return data;
};
