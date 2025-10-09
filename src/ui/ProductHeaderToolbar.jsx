import { Button, Text } from "@mantine/core";
import { FiSliders } from "react-icons/fi";

function ProductHeaderToolbar({
  filteredProducts,
  searchQuery,
  selectedCategory,
  priceRange,
  maxPrice,
  showFilters,
  setShowFilters,
}) {
  return (
    <div className="p-4 mb-4 backdrop-blur-lg shadow-md rounded-lg bg-white/60 md:flex hidden ">
      <div className="flex justify-start md:justify-end lg:justify-between items-center">
        {/* Products count (hidden in your code but can be re-enabled if needed) */}
        <div className="hidden lg:block">
          <Text fw={600} size="lg" className="text-gray-900">
            {filteredProducts.length} Products Found
          </Text>
          {(searchQuery ||
            selectedCategory ||
            priceRange[0] > 0 ||
            priceRange[1] < maxPrice) && (
            <Text size="sm" className="text-gray-600">
              Showing filtered results
            </Text>
          )}
        </div>

        {/* Toggle button only for small screens */}
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
    </div>
  );
}

export default ProductHeaderToolbar;
