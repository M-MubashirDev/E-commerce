import { useEffect, useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Title } from "@mantine/core";
import { fetchCategories } from "../../features/categories/categoriesThunks";
import CategoriesTable from "../../components/CategoriesTable";
import {
  categoryInitialState,
  categoryReducer,
} from "../../utilities/Reducers";

export default function Categories() {
  const dispatch = useDispatch();
  const { categories, loading } = useSelector((state) => state.categories);
  const [state, dispatchReducer] = useReducer(
    categoryReducer,
    categoryInitialState
  );

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
