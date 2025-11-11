import { useEffect, useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Title } from "@mantine/core";
import { fetchCategories } from "../../features/categories/categoriesThunks";
import CategoriesTable from "../../components/CategoriesTable";

const initialState = {
  page: 0,
  limit: 20,
  title: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "title":
      return { ...state, title: action.payload };
    case "page":
      return { ...state, page: action.payload };
    default:
      return state;
  }
}

export default function Categories() {
  const dispatch = useDispatch();
  const { categories, loading } = useSelector((state) => state.categories);
  const [state, dispatchReducer] = useReducer(reducer, initialState);

  const totalPages = Math.ceil(categories.count / state.limit);
  const { page, title, limit } = state;

  useEffect(() => {
    dispatch(fetchCategories({ page, limit, title }));
  }, [dispatch, page, title, limit]);

  return (
    <div>
      <Title order={2} mb="lg" align="center">
        Categories
      </Title>

      <CategoriesTable
        categories={categories.rows}
        loading={loading}
        totalPages={totalPages}
        currentPage={state.page}
        onPageChange={(page) =>
          dispatchReducer({ type: "page", payload: page })
        }
        onSearch={(term) => {
          dispatchReducer({ type: "title", payload: term });
        }}
      />
    </div>
  );
}
