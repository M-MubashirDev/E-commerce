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
export const AdminProductInitialStates = {
  page: 0,
  limit: 10,
  title: "",
  categoryId: null,
  price: { lowerLimit: 0, upperLimit: 2500 },
  sortBy: "name",
};

export function adminProductReducer(state, action) {
  switch (action.type) {
    case "setField": {
      console.log([action.field], action.value);
      return { ...state, [action.field]: action.value };
    }
    case "setPage":
      return { ...state, page: action.payload };
    case "reset":
      return { ...AdminProductInitialStates };
    default:
      return state;
  }
}
//.........orders
export const orderInitialState = {
  page: 0,
  limit: 10,
  address: "",
};

export function orderReducer(state, action) {
  switch (action.type) {
    case "address":
      return { ...state, address: action.payload };
    case "page":
      return { ...state, page: action.payload };
    default:
      return state;
  }
}
export const categoryInitialState = {
  page: 0,
  limit: 20,
  title: "",
};

export function categoryReducer(state, action) {
  switch (action.type) {
    case "title":
      return { ...state, title: action.payload };
    case "page":
      return { ...state, page: action.payload };
    default:
      return state;
  }
}
export const customerInitialState = {
  page: 0,
  limit: 20,
};

export function cutomerReducer(state, action) {
  switch (action.type) {
    case "page":
      return { ...state, page: action.payload };
    default:
      return state;
  }
}
