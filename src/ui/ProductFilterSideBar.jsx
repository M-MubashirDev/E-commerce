import {
  TextInput,
  Select,
  RangeSlider,
  Button,
  Group,
  Text,
  Stack,
} from "@mantine/core";
import { FiFilter, FiX, FiSearch } from "react-icons/fi";

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
}) {
  const isFilterCLoseShow =
    sortBy !== "name" ||
    priceRange[0] !== 0 ||
    priceRange[1] !== maxPrice ||
    searchQuery ||
    (selectedCategory && selectedCategory !== "all")
      ? true
      : false;

  return (
    <div
      className={`${
        showFilters ? "w-full md:w-80 md:block" : "hidden"
      }  transition-all  min-h-full duration-300 `}
    >
      <div className="p-6 !rounded-xl  shadow-lg !bg-light backdrop-blur-lg">
        <Group justify="space-between" mb="lg">
          <Group>
            <FiFilter size={20} className="text-gray-900" />
            <Text fw={600} size="lg" className="text-gray-900">
              Filters
            </Text>
          </Group>
          <Button
            variant="subtle"
            size="xs"
            color="gray"
            onClick={clearFilters}
            className={isFilterCLoseShow ? "!flex" : "!hidden"}
            leftSection={<FiX size={14} />}
          >
            Clear All
          </Button>
        </Group>

        <Stack gap="xl">
          {/* Search */}
          <div>
            <Text size="sm" fw={500} mb="xs" className="text-gray-900">
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
            <Text size="sm" fw={500} mb="xs" className="text-gray-900">
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
            <Text size="sm" fw={500} mb="xs" className="text-gray-900">
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
            <Text size="sm" fw={500} mb="xs" className="text-gray-900">
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
          </div>
        </Stack>
      </div>
    </div>
  );
}

export default ProductFilterSideBar;
