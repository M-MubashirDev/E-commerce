import {
  TextInput,
  Select,
  RangeSlider,
  Button,
  Text,
  Stack,
} from "@mantine/core";
import { FiFilter, FiX, FiSearch, FiSliders } from "react-icons/fi";

function ProductFilterSideBar({
  showFilters,
  clearFilters,
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  categoryOptions,
  priceRange,
  setPriceRange,
  maxPrice,
  sortBy,
  setSortBy,
  setShowFilters,
}) {
  const isFilterCLoseShow =
    sortBy !== "name" ||
    priceRange[0] !== 0 ||
    priceRange[1] !== maxPrice ||
    searchQuery ||
    (selectedCategory && selectedCategory !== "All")
      ? true
      : false;

  return (
    <div className={`transition-all  min-h-full duration-300 `}>
      <div className="p-6 !rounded-xl  shadow-lg !bg-light backdrop-blur-lg">
        <div className="sm:!min-w-[20rem] gap-2 flex flex-col sm:flex-row  sm:justify-between">
          <div className="flex items-center gap-1 max-w-fit">
            <FiFilter size={20} className="text-gray-900" />
            <Text fw={600} size="lg" className="text-gray-900">
              Filters
            </Text>
          </div>

          <Button
            color="dark"
            leftSection={<FiSliders size={16} />}
            onClick={() => setShowFilters(!showFilters)}
            radius="md"
            className="md:hidden"
          >
            {showFilters ? "Hide" : "Show"} Filters
          </Button>
        </div>

        <Stack
          gap="md"
          className={`${
            showFilters ? "!w-full md:!w-80 md:!flex " : "!hidden"
          } !mt-5 `}
        >
          {/* Search */}
          <div>
            <Text size="sm" fw={500} className="text-gray-900">
              Search Products
            </Text>
            <TextInput
              placeholder="Search for products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              leftSection={<FiSearch size={16} />}
              radius="md"
            />
          </div>

          {/* Category Filter */}
          <div>
            <Text size="sm" fw={500} className="text-gray-900">
              Category
            </Text>
            <Select
              placeholder="Select category"
              value={selectedCategory || "all"}
              onChange={setSelectedCategory}
              data={categoryOptions}
              radius="md"
            />
          </div>

          {/* Price Range */}
          <div>
            <Text size="sm" fw={500} className="text-gray-900">
              Price Range: ${priceRange[0]} - ${priceRange[1]}
            </Text>
            <RangeSlider
              value={priceRange}
              onChange={setPriceRange}
              min={0}
              max={maxPrice}
              step={1}
              color="dark"
              size="md"
            />
          </div>

          {/* Sort By */}
          <div>
            <Text size="sm" fw={500} className="text-gray-900">
              Sort By
            </Text>
            <Select
              value={sortBy}
              onChange={setSortBy}
              data={[
                { value: "name", label: "Name (A-Z)" },
                { value: "price-low", label: "Price: Low to High" },
                { value: "price-high", label: "Price: High to Low" },
              ]}
              radius="md"
            />
            <Button
              variant=""
              size="xs"
              onClick={clearFilters}
              className={isFilterCLoseShow ? "!flex !mt-4" : "!hidden"}
              leftSection={<FiX size={14} />}
            >
              Clear All
            </Button>
          </div>
        </Stack>
      </div>
    </div>
  );
}

export default ProductFilterSideBar;
