import {
  TextInput,
  Select,
  RangeSlider,
  Button,
  Text,
  Stack,
} from "@mantine/core";
import { useEffect, useState, useCallback, useRef } from "react";
import { FiFilter, FiX, FiSearch, FiSliders } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";

import { fetchCategories } from "../features/categories/categoriesThunks";

function ProductFilterSideBar({ state, maxPrice, setSearchParams }) {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.categories);
  const [isShowFilterTab, setShowFilterTab] = useState(true);

  // Local state for search input to enable debouncing
  const [searchInput, setSearchInput] = useState("");

  // Local state for price range to prevent multiple API calls
  const [localPriceRange, setLocalPriceRange] = useState([0, maxPrice || 2000]);

  // Ref to store the debounce timers
  const searchDebounceTimer = useRef(null);
  const priceDebounceTimer = useRef(null);

  const isFilterCLoseShow =
    state.title ||
    state.category_id ||
    state.price.lowerLimit > 0 ||
    state.price.upperLimit !== maxPrice;

  // Sync local state when state changes (from URL)
  useEffect(() => {
    setSearchInput(state.title);
  }, [state.title]);

  useEffect(() => {
    setLocalPriceRange([state.price.lowerLimit, state.price.upperLimit]);
  }, [state.price.lowerLimit, state.price.upperLimit]);

  useEffect(() => {
    if (categories.rows.length) return;
    dispatch(fetchCategories());
  }, [dispatch, categories.rows.length]);

  // Debounced search handler
  const handleSearchChange = useCallback(
    (value) => {
      setSearchInput(value);

      // Clear existing timer
      if (searchDebounceTimer.current) {
        clearTimeout(searchDebounceTimer.current);
      }

      // Set new timer for 500ms debounce
      searchDebounceTimer.current = setTimeout(() => {
        setSearchParams((prev) => {
          const params = Object.fromEntries(prev);
          const trimmedValue = value.trim();

          if (trimmedValue) {
            params.title = trimmedValue;
          } else {
            delete params.title;
          }
          delete params.page;
          return params;
        });
      }, 500);
    },
    [setSearchParams]
  );

  // Cleanup debounce timers on unmount
  useEffect(() => {
    return () => {
      if (searchDebounceTimer.current) {
        clearTimeout(searchDebounceTimer.current);
      }
      if (priceDebounceTimer.current) {
        clearTimeout(priceDebounceTimer.current);
      }
    };
  }, []);

  const handleCategoryChange = useCallback(
    (value) => {
      setSearchParams((prev) => {
        const params = Object.fromEntries(prev);
        if (value && value !== "All") {
          params.category = value;
        } else {
          delete params.category;
        }
        delete params.page;
        return params;
      });
    },
    [setSearchParams]
  );

  const handleSortChange = useCallback(
    (value) => {
      setSearchParams((prev) => {
        const params = Object.fromEntries(prev);
        if (value) {
          params.sort = value;
        } else {
          delete params.sort;
        }
        return params;
      });
    },
    [setSearchParams]
  );

  // Debounced price range handler
  const handlePriceChangeEnd = useCallback(
    (val) => {
      // Clear existing timer
      if (priceDebounceTimer.current) {
        clearTimeout(priceDebounceTimer.current);
      }

      // Set new timer for 300ms debounce
      priceDebounceTimer.current = setTimeout(() => {
        setSearchParams((prev) => {
          const params = Object.fromEntries(prev);

          // Only add price params if they're different from defaults
          if (val[0] !== 0) {
            params.minPrice = val[0];
          } else {
            delete params.minPrice;
          }

          if (val[1] !== maxPrice) {
            params.maxPrice = val[1];
          } else {
            delete params.maxPrice;
          }

          delete params.page;
          return params;
        });
      }, 300);
    },
    [setSearchParams, maxPrice]
  );

  const handleClearFilters = useCallback(() => {
    // Clear local state immediately for instant UI feedback
    setSearchInput("");
    setLocalPriceRange([0, maxPrice || 2000]);

    // Clear any pending debounce
    if (searchDebounceTimer.current) {
      clearTimeout(searchDebounceTimer.current);
    }
    if (priceDebounceTimer.current) {
      clearTimeout(priceDebounceTimer.current);
    }

    // Clear URL params
    setSearchParams({});
  }, [maxPrice, setSearchParams]);

  return (
    <div className={`transition-all min-h-full duration-300`}>
      <div className="p-6 !rounded-xl shadow-lg !bg-light backdrop-blur-lg">
        <div className="sm:!min-w-[20rem] gap-2 flex flex-col sm:flex-row sm:justify-between">
          <div className="flex items-center gap-1 max-w-fit">
            <FiFilter size={20} className="text-gray-900" />
            <Text fw={600} size="lg" className="text-gray-900">
              Filters
            </Text>
          </div>

          <Button
            color="dark"
            leftSection={<FiSliders size={16} />}
            radius="md"
            onClick={() => setShowFilterTab((value) => !value)}
            className="md:hidden"
          >
            {isShowFilterTab ? "Hide" : "Show"} Filters
          </Button>
        </div>

        {isShowFilterTab && (
          <Stack
            gap="md"
            className={`${
              isShowFilterTab ? "!w-full md:!w-80 md:!flex" : "!hidden"
            } !mt-5`}
          >
            <div>
              <Text size="sm" fw={500} className="text-gray-900">
                Search Product
              </Text>
              <TextInput
                placeholder="Search for products..."
                value={searchInput}
                onChange={(e) => handleSearchChange(e.target.value)}
                leftSection={<FiSearch size={16} />}
                radius="md"
              />
            </div>

            <div>
              <Text size="sm" fw={500} className="text-gray-900">
                Category
              </Text>
              <Select
                placeholder="Select category"
                value={state?.category_id || "All"}
                allowDeselect={false}
                onChange={handleCategoryChange}
                data={[
                  { value: "All", label: "All" },
                  ...categories.rows.map((cat) => ({
                    value: cat.id.toString(),
                    label: cat.title,
                  })),
                ]}
                radius="md"
              />
            </div>

            <div>
              <Text size="sm" fw={500} className="text-gray-900">
                Price Range: {localPriceRange[0]} - {localPriceRange[1]}
              </Text>
              <RangeSlider
                value={localPriceRange}
                onChange={(val) => {
                  // Only update local state during dragging for smooth UI
                  setLocalPriceRange(val);
                }}
                onChangeEnd={handlePriceChangeEnd}
                min={0}
                max={maxPrice || 2000}
                step={1}
                color="dark"
                size="md"
              />
            </div>

            <div>
              <Text size="sm" fw={500} className="text-gray-900">
                Sort By
              </Text>
              <Select
                value={state.sortBy}
                onChange={handleSortChange}
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
                onClick={handleClearFilters}
                className={isFilterCLoseShow ? "!flex !mt-4" : "!hidden"}
                leftSection={<FiX size={14} />}
              >
                Clear All
              </Button>
            </div>
          </Stack>
        )}
      </div>
    </div>
  );
}

export default ProductFilterSideBar;
