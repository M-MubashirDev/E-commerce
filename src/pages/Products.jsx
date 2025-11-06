import { useEffect, useReducer } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Paper, Text, Loader, Pagination } from "@mantine/core";

import { fetchProducts } from "../features/products/productsThunks";
import ProductFilterSideBar from "../ui/ProductFilterSideBar";
import ProductGrid from "../ui/ProductItemGrid";
import SmallHero from "../components/SmallHero";

const initialStates = {
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

function reducer(state, action) {
  switch (action.type) {
    case "category":
      return {
        ...state,
        category_id: action.payload === "All" ? null : action.payload,
      };
    case "title":
      return { ...state, title: action.payload };
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
        ...initialStates,
        price: {
          lowerLimit: 0,
          upperLimit: action.payload,
        },
      };
    case "sort":
      return {
        ...state,
        sortBy: action.payload,
      };
    default:
      return state;
  }
}

const Products = () => {
  const dispatch = useDispatch();
  const [state, dispatchReducer] = useReducer(reducer, initialStates);

  const {
    items: products,
    total,
    loading,
    maxPrice,
  } = useSelector((state) => state.products);
  const totalPages = Math.max(1, Math.ceil(total / state.limit));

  useEffect(() => {
    dispatch(fetchProducts(state));
  }, [dispatch, state]);

  useEffect(() => {
    dispatchReducer({
      type: "price",
      payload: [0, maxPrice],
    });
  }, [maxPrice]);

  return (
    <div className="min-h-screen bg-light-gray">
      <SmallHero />
      <div className="content-spacing h-full py-6">
        <div className="flex flex-col h-full md:flex-row gap-8">
          <ProductFilterSideBar
            dispatchReducer={dispatchReducer}
            state={state}
            maxPrice={maxPrice}
          />

          <div className="flex-1 relative">
            {loading && products.length > 0 && (
              <div className="absolute inset-0 bg-white/50 backdrop-blur-sm z-10 flex items-center justify-center rounded-xl">
                <Loader size="lg" color="dark" />
              </div>
            )}

            {products.length === 0 && !loading ? (
              <Paper
                className="p-12 text-center"
                style={{
                  background: "rgba(255, 255, 255, 0.85)",
                  backdropFilter: "blur(20px)",
                }}
                radius="xl"
                shadow="md"
              >
                <Text size="xl" fw={500} className="text-gray-700 mb-4">
                  No products found
                </Text>
                <Text className="text-gray-600 mb-6">
                  Try adjusting your filters or search terms
                </Text>
                <Button
                  onClick={() => dispatchReducer({ type: "clearFilters" })}
                  variant="filled"
                  className="mt-3"
                >
                  Clear All Filters
                </Button>
              </Paper>
            ) : (
              <ProductGrid paginatedProducts={products} />
            )}

            <Pagination
              total={totalPages}
              value={state.page + 1} // Mantine pages are 1-based
              onChange={
                (page) => dispatchReducer({ type: "page", payload: page - 1 }) // API expects 0-based
              }
              siblings={1}
              boundaries={1}
              className="mt-6 flex justify-center"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
