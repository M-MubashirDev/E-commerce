import {
  TextInput,
  Select,
  RangeSlider,
  Button,
  Text,
  Stack,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { FiFilter, FiX, FiSearch, FiSliders } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../features/categories/categoriesThunks";

function ProductFilterSideBar({
  dispatchReducer,
  state,
  maxPrice,
  setSearchParams,
}) {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.categories);
  const [isShowFilterTab, setShowFilterTab] = useState(true);

  const isFilterCLoseShow =
    state.title ||
    state.category_id ||
    state.price.lowerLimit > 0 ||
    state.price.upperLimit !== maxPrice;

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);
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
              isShowFilterTab ? "!w-full md:!w-80 md:!flex " : "!hidden"
            } !mt-5 `}
          >
            {/* Search */}
            <div>
              <Text size="sm" fw={500} className="text-gray-900">
                Search Product
              </Text>
              <TextInput
                placeholder="Search for products..."
                value={state.title}
                onChange={(e) => {
                  dispatchReducer({
                    type: "title",
                    payload: e.target.value,
                  });
                  setSearchParams((prev) => ({
                    ...Object.fromEntries(prev),
                    title: e.target.value,
                  }));
                }}
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
                value={state?.category_id || "All"}
                onChange={(value) => {
                  if (value === null || value === state.category_id) return;
                  dispatchReducer({
                    type: "category",
                    payload: value,
                  });
                  setSearchParams((prev) => ({
                    ...Object.fromEntries(prev),
                    category: value,
                  }));
                }}
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

            {/* Price Range */}
            <div>
              <Text size="sm" fw={500} className="text-gray-900">
                Price Range: {state.price.lowerLimit} - {maxPrice}
              </Text>
              <RangeSlider
                value={[state.price.lowerLimit, state.price.upperLimit]}
                onChange={(val) =>
                  dispatchReducer({
                    type: "price",
                    payload: val,
                  })
                }
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
                value={state.sortBy}
                onChange={(value) => {
                  dispatchReducer({
                    type: "sort",
                    payload: value,
                  });
                  setSearchParams((prev) => ({
                    ...Object.fromEntries(prev),
                    sortBy: value,
                  }));
                }}
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
                onClick={() => {
                  dispatchReducer({
                    type: "clearFilters",
                    payload: maxPrice,
                  });
                  setSearchParams({});
                }}
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
