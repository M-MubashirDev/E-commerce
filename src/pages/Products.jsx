import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
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
  const { items, total, loading, maxPrice } = useSelector(
    (state) => state.products
  );
  const {
    categories,
    selectedCategory,
    loading: catLoading,
  } = useSelector((state) => state.categories);

  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState([0, maxPrice || 1000]);
  const [sortBy, setSortBy] = useState("name");
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 14;

  const [debouncedSearchQuery] = useDebouncedValue(searchQuery, 500);
  const [debouncedPriceRange] = useDebouncedValue(priceRange, 500);

  useEffect(() => {
    if (maxPrice) {
      setPriceRange((prev) => [prev[0], maxPrice]);
    }
  }, [maxPrice]);
  console.log(priceRange[1], maxPrice);
  useEffect(() => {
    if (catLoading) return;
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
  }, [
    dispatch,
    currentPage,
    debouncedSearchQuery,
    debouncedPriceRange,
    selectedCategory,
    sortBy,
    catLoading,
    categories,
  ]);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const clearFilters = () => {
    setSearchQuery("");
    setPriceRange([0, maxPrice || 1000]);
    setSortBy("name");
    dispatch(setCategory("All"));
  };

  if (loading && catLoading) {
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
  console.log(maxPrice, "maxPrice");

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
            setSelectedCategory={(category) => dispatch(setCategory(category))}
            categoryOptions={["All", ...categories.map((c) => c.name)]}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            maxPrice={maxPrice || 1000} // Pass maxPrice from Redux
            sortBy={sortBy}
            setSortBy={setSortBy}
            setShowFilters={setShowFilters}
          />

          <div className="flex-1">
            {items.length === 0 ? (
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
                <Button onClick={clearFilters} variant="outline" color="gray">
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
