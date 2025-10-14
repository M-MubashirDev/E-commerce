import { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import {
  Button,
  Paper,
  Text,
  Container,
  Stack,
  Loader,
  Center,
} from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";

import { fetchProducts } from "../features/products/productsThunks";
import { setCategory } from "../features/categories/categoriesSlice";
import ProductFilterSideBar from "../ui/ProductFilterSideBar";
import ProductGrid from "../ui/ProductItemGrid";
import ProductPagination from "../ui/Pagination";
import SmallHero from "../components/SmallHero";
import { fetchCategories } from "../features/categories/categoriesThunks";

const Products = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  const { items, total, loading, maxPrice } = useSelector(
    (state) => state.products
  );
  const {
    categories,
    selectedCategory,
    loading: catLoading,
  } = useSelector((state) => state.categories);

  const itemsPerPage = 14;

  // Initialize state from URL params
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("search") || ""
  );
  const [priceRange, setPriceRange] = useState([
    parseInt(searchParams.get("minPrice")) || 0,
    parseInt(searchParams.get("maxPrice")) || maxPrice || 1000,
  ]);
  const [sortBy, setSortBy] = useState(searchParams.get("sort") || "name");
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(
    parseInt(searchParams.get("page")) || 1
  );

  const [isInitialized, setIsInitialized] = useState(false);

  const [debouncedSearchQuery] = useDebouncedValue(searchQuery, 500);
  const [debouncedPriceRange] = useDebouncedValue(priceRange, 500);

  // Fetch categories only once on mount
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  // Initialize category from URL after categories are loaded
  useEffect(() => {
    if (!catLoading && categories.length > 0 && !isInitialized) {
      const categoryParam = searchParams.get("category");
      if (categoryParam) {
        dispatch(setCategory(categoryParam));
      }
      setIsInitialized(true);
    }
  }, [catLoading, categories, searchParams, dispatch, isInitialized]);

  // Update price range when maxPrice changes
  useEffect(() => {
    if (maxPrice && maxPrice > 0) {
      setPriceRange((prev) => [
        prev[0],
        parseInt(searchParams.get("maxPrice")) || maxPrice,
      ]);
    }
  }, [maxPrice, searchParams]);

  // Update URL params whenever filters change
  const updateURLParams = useCallback(() => {
    const params = {};

    if (debouncedSearchQuery) params.search = debouncedSearchQuery;
    if (debouncedPriceRange[0] > 0) params.minPrice = debouncedPriceRange[0];
    if (debouncedPriceRange[1] < (maxPrice || 1000))
      params.maxPrice = debouncedPriceRange[1];
    if (sortBy !== "name") params.sort = sortBy;
    if (selectedCategory && selectedCategory !== "All")
      params.category = selectedCategory;
    if (currentPage > 1) params.page = currentPage;

    setSearchParams(params, { replace: true });
  }, [
    debouncedSearchQuery,
    debouncedPriceRange,
    sortBy,
    selectedCategory,
    currentPage,
    maxPrice,
    setSearchParams,
  ]);

  // Fetch products with proper dependencies
  useEffect(() => {
    if (!isInitialized || catLoading) return;

    const offset = (currentPage - 1) * itemsPerPage;
    dispatch(
      fetchProducts({
        limit: itemsPerPage,
        offset,
        searchQuery: debouncedSearchQuery,
        priceMin: debouncedPriceRange[0],
        priceMax: debouncedPriceRange[1],
        categoryId:
          selectedCategory && selectedCategory !== "All"
            ? categories.find((c) => c.name === selectedCategory)?.id
            : null,
        sortBy,
      })
    );

    // Update URL params after fetch
    updateURLParams();
  }, [
    dispatch,
    currentPage,
    debouncedSearchQuery,
    debouncedPriceRange,
    selectedCategory,
    sortBy,
    isInitialized,
    catLoading,
    categories,
    updateURLParams,
  ]);

  const clearFilters = () => {
    setSearchQuery("");
    setPriceRange([0, maxPrice || 1000]);
    setSortBy("name");
    dispatch(setCategory("All"));
    setCurrentPage(1);
    setSearchParams({}, { replace: true });
  };

  // Show loader only during initial load
  if (!isInitialized || (loading && items.length === 0)) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Container size="xl" className="content-spacing py-8">
          <Center style={{ height: "60vh" }}>
            <Stack align="center" gap="md">
              <Loader size="xl" color="dark" />
              <Text size="lg" className="text-gray-700">
                Loading products...
              </Text>
            </Stack>
          </Center>
        </Container>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-light-gray">
      <SmallHero />
      <div className="content-spacing h-full py-6">
        <div className="flex flex-col h-full md:flex-row gap-8">
          <ProductFilterSideBar
            showFilters={showFilters}
            clearFilters={clearFilters}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedCategory={selectedCategory}
            setSelectedCategory={(category) => {
              dispatch(setCategory(category));
              setCurrentPage(1); // Reset page when category changes
            }}
            categoryOptions={["All", ...categories.map((c) => c.name)]}
            priceRange={priceRange}
            setPriceRange={(range) => {
              setPriceRange(range);
              setCurrentPage(1); // Reset page when price changes
            }}
            maxPrice={maxPrice || 1000}
            sortBy={sortBy}
            setSortBy={(sort) => {
              setSortBy(sort);
              setCurrentPage(1); // Reset page when sort changes
            }}
            setShowFilters={setShowFilters}
          />

          <div className="flex-1 relative">
            {/* Overlay loader for subsequent loads */}
            {loading && items.length > 0 && (
              <div className="absolute inset-0 bg-white/50 backdrop-blur-sm z-10 flex items-center justify-center rounded-xl">
                <Loader size="lg" color="dark" />
              </div>
            )}

            {items.length === 0 && !loading ? (
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
                  onClick={clearFilters}
                  variant="filled"
                  className="mt-3"
                >
                  Clear All Filters
                </Button>
              </Paper>
            ) : (
              <ProductGrid
                paginatedProducts={items}
                showFilters={showFilters}
              />
            )}

            {Math.ceil(total / itemsPerPage) > 1 && (
              <ProductPagination
                currentPage={currentPage}
                totalPages={Math.ceil(total / itemsPerPage)}
                setCurrentPage={setCurrentPage}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
