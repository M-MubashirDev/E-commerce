import { adminApi } from "../../utilities/axiosInspector";

// ✅ Fetch all products (with filters, pagination, etc.)
export const getProducts = async (filters = {}) => {
  console.log(filters);
  const payload = {
    page: filters.page || 0,
    limit: filters.limit || 12,
    title: filters.title || "",
    category_id: filters.category_id || filters.categoryId || "",
    discount: filters.discount ?? 0,
    price: {
      lowerLimit: filters.price?.lowerLimit || 0,
      upperLimit: filters.price?.upperLimit || 0,
    },
  };
  const { data } = await adminApi.post(`/product/view`, payload);
  const result = data.result;
  let sortedArray = [...result.rows];

  switch (filters.sortBy) {
    case "name":
      sortedArray.sort((a, b) => a.title.localeCompare(b.title));
      break;
    case "price-low":
      sortedArray.sort((a, b) => a.price - b.price);
      break;
    case "price-high":
      sortedArray.sort((a, b) => b.price - a.price);
      break;
    default:
      break;
  }

  return {
    items: sortedArray || [],
    total: result.count || 0,
    minPrice: result.minPrice || 0,
    maxPrice: result.maxPrice || 0,
  };
};

// ✅ Fetch single product by ID
export const getProduct = async (id) => {
  const { data } = await adminApi.get(`/product/view/${id}`);
  return data.result;
};
