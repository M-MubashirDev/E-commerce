import { useState, useEffect, useMemo } from "react";
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

import { fetchProducts } from "../features/products/productsThunks";
import { fetchCategories } from "../features/categories/categoriesThunks";
import ProductFilterSideBar from "../ui/ProductFilterSideBar";
import ProductHeaderToolbar from "../ui/ProductHeaderToolbar";
import ProductGrid from "../ui/ProductItemGrid";
import ProductPagination from "../ui/Pagination";
import SmallHero from "../components/SmallHero";

const Products = () => {
  const dispatch = useDispatch();
  const { products, loading: productsLoading } = useSelector(
    (state) => state.products
  );
  const { categories, loading: categoriesLoading } = useSelector(
    (state) => state.categories
  );

  // Filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [sortBy, setSortBy] = useState("name");
  const [showFilters, setShowFilters] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  useEffect(() => {
    if (products.length === 0) {
      dispatch(fetchProducts());
    }
    if (categories.length === 0) {
      dispatch(fetchCategories());
    }
  }, [dispatch, products.length, categories.length]);

  // Calculate price range from products
  const maxPrice = useMemo(() => {
    if (products.length === 0) return 1000;
    return Math.ceil(Math.max(...products.map((p) => p.price || 0)));
  }, [products]);

  // Update price range when products load
  useEffect(() => {
    if (maxPrice > 0 && priceRange[1] === 1000) {
      setPriceRange([0, maxPrice]);
    }
  }, [maxPrice, priceRange]);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    if (searchQuery) {
      filtered = filtered.filter(
        (product) =>
          product.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedCategory && selectedCategory !== "all") {
      filtered = filtered.filter(
        (product) => product.category?.name === selectedCategory
      );
    }

    filtered = filtered.filter(
      (product) =>
        product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return (a.price || 0) - (b.price || 0);
        case "price-high":
          return (b.price || 0) - (a.price || 0);
        case "name":
          return (a.title || "").localeCompare(b.title || "");
        default:
          return 0;
      }
    });

    return filtered;
  }, [products, searchQuery, selectedCategory, priceRange, sortBy]);

  // Pagination slice
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory, priceRange, sortBy]);

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("");
    setPriceRange([0, maxPrice]);
    setSortBy("name");
  };

  const categoryOptions = useMemo(() => {
    const seen = new Set();
    const cleaned = categories
      .filter((cat) => {
        const valid = cat.name && cat.name.trim() !== "";
        if (!valid || seen.has(cat.name.trim().toLowerCase())) return false;
        seen.add(cat.name.trim().toLowerCase());
        return true;
      })
      .map((cat) => ({
        value: cat.name.trim(),
        label: cat.name.trim(),
      }));

    return [{ value: "all", label: "All Categories" }, ...cleaned];
  }, [categories]);

  console.log(categories);

  if (productsLoading || categoriesLoading) {
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
    <div className="min-h-screen bg-light-gray ">
      <SmallHero />
      <div className="content-spacing h-full  py-6">
        <div className="flex flex-col h-full  md:flex-row gap-8">
          <ProductFilterSideBar
            showFilters={showFilters}
            clearFilters={clearFilters}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            categoryOptions={categoryOptions}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            maxPrice={maxPrice}
            sortBy={sortBy}
            setSortBy={setSortBy}
          />

          <div className="flex-1">
            <ProductHeaderToolbar
              filteredProducts={filteredProducts}
              searchQuery={searchQuery}
              selectedCategory={selectedCategory}
              priceRange={priceRange}
              maxPrice={maxPrice}
              showFilters={showFilters}
              setShowFilters={setShowFilters}
            />
            {paginatedProducts.length === 0 ? (
              <Paper
                className="p-12 text-center  "
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
              <>
                {/* Scrollable Grid */}
                <ProductGrid
                  paginatedProducts={paginatedProducts}
                  showFilters={showFilters}
                />

                {/* Improved Pagination */}
                {totalPages > 1 && (
                  <ProductPagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    setCurrentPage={setCurrentPage}
                  />
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
