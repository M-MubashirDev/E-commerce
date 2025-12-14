import { Button, Select, TextInput } from "@mantine/core";
import { FiSearch } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../features/categories/categoriesThunks";
import { useEffect } from "react";

function AdminProductsFilters({
  handleSearchChange,
  handleCategoryChange,
  state,
  handleSortChange,
  handleAdd,
  // handlePriceChange,
  // maxPrice,
}) {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-center gap-3 p-4 border-b border-gray-200">
        <TextInput
          placeholder="Search product..."
          leftSection={<FiSearch size={16} />}
          value={state.title}
          onChange={(e) => handleSearchChange(e.target.value)}
          radius="md"
          className="w-fit md:w-1/4"
        />

        <div className="flex w-full justify-center sm:justify-end gap-3">
          <Select
            placeholder="Category"
            value={state.categoryId?.toString() || "All"}
            onChange={handleCategoryChange}
            data={[
              { value: "All", label: "All" },
              ...categories.rows.map((c) => ({
                value: c.id.toString(),
                label: c.title,
              })),
            ]}
            radius="md"
            className="w-fit sm:w-fit md:w-1/5"
          />

          <Button size="sm" onClick={handleAdd}>
            Add New
          </Button>
        </div>
      </div>
      <div className="flex m-3 items-center gap-3 justify-center  sm:justify-end">
        {/* <RangeSlider
          value={[state.price.lowerLimit, state.price.upperLimit]}
          onChange={handlePriceChange}
          min={0}
          max={maxPrice}
          step={1}
          color="dark"
          className="w-full md:w-1/3"
        /> */}

        <Select
          placeholder="Sort By"
          value={state.sortBy}
          onChange={handleSortChange}
          data={[
            { value: "name", label: "Name (A-Z)" },
            { value: "price-low", label: "Price Low → High" },
            { value: "price-high", label: "Price High → Low" },
          ]}
          radius="md"
          className="w-fit md:w-1/5"
        />
      </div>
    </div>
  );
}

export default AdminProductsFilters;
