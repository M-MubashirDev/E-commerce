import { useEffect, useReducer } from "react";
import { useSearchParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Button, Paper, Text, Loader, Pagination } from "@mantine/core";

import ProductFilterSideBar from "../ui/ProductFilterSideBar";
import ProductGrid from "../ui/ProductItemGrid";
import SmallHero from "../components/SmallHero";
import ErrorMessage from "../ui/ErrorMessage";

import { fetchProducts } from "../features/products/productsThunks";
import { ProductInitialStates, productReducer } from "../utilities/Reducers";
import { Spinner } from "../ui/Spinners";

const Products = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  const [state, dispatchReducer] = useReducer(
    productReducer,
    ProductInitialStates
  );

  const {
    items: products,
    total,
    loading,
    maxPrice,
    error,
  } = useSelector((state) => state.products);

  const { page, sort, title, category } = Object.fromEntries(searchParams);
  const totalPages = Math.max(1, Math.ceil(total / state.limit));

  useEffect(() => {
    if (!page && !sort && !title && !category) return;

    dispatchReducer({
      type: "params",
      payload: {
        page,
        title,
        category,
        sortBy: sort,
      },
    });
  }, [page, category, title, sort]);

  useEffect(() => {
    dispatch(fetchProducts(state));
  }, [dispatch, state]);

  useEffect(() => {
    dispatchReducer({
      type: "price",
      payload: [0, maxPrice],
    });
  }, [maxPrice]);

  if (error) return <ErrorMessage error={error} />;
  if (loading) return <Spinner />;

  return (
    <div className="min-h-screen bg-light-gray">
      <SmallHero />
      <div className="content-spacing h-full py-6">
        <div className="flex flex-col h-full md:flex-row gap-8">
          <ProductFilterSideBar
            dispatchReducer={dispatchReducer}
            state={state}
            maxPrice={maxPrice}
            setSearchParams={setSearchParams}
            searchParams={searchParams}
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

            {loading || (
              <Pagination
                total={totalPages}
                value={state.page + 1}
                onChange={(page) => {
                  setSearchParams((prev) => ({
                    ...Object.fromEntries(prev),
                    page: page - 1,
                  }));
                }}
                siblings={1}
                boundaries={1}
                className="mt-6 flex justify-center"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
