export const ProductInitialStates = {
  page: 0,
  limit: 20,
  title: "",
  category_id: null,
  sortBy: "name",
  price: {
    lowerLimit: 0,
    upperLimit: 2000,
  },
};
export function productReducer(state, action) {
  switch (action.type) {
    case "price":
      return {
        ...state,
        price: {
          lowerLimit: action.payload[0],
          upperLimit: action.payload[1],
        },
      };
    case "page":
      return { ...state, page: action.payload };
    case "clearFilters":
      return {
        ...ProductInitialStates,
        price: {
          lowerLimit: 0,
          upperLimit: action.payload,
        },
      };
    case "params": {
      const { page, title, category, sortBy } = action.payload;

      const cat = category === "All" || !category ? null : category;

      return {
        ...state,
        page: page ?? state.page,
        title: title ?? state.title,
        category_id: cat,
        sortBy: sortBy ?? state.sortBy,
      };
    }

    default:
      return state;
  }
}
