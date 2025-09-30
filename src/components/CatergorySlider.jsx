import { Avatar, Button, ScrollArea, Box } from "@mantine/core";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCategory } from "../features/categories/categoriesSlice";
import { fetchCategories } from "../features/categories/categoriesThunks";

export default function ExploreCategories() {
  const fallbackImage = "logo.png";

  const dispatch = useDispatch();
  const { categories, loading, error, selectedCategory } = useSelector(
    (state) => state.categories
  );

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <section
      id="exploreCategories"
      className="relative   max-w-[calc(100vw-48px)]  content-spacing   mx-auto bg-light  "
    >
      {loading && (
        <div className="text-center text-gray-300 rounded-md font-medium text-lg py-4 bg-gray-800 border-l-4 border-blue-500 shadow-md">
          Loading categories...
        </div>
      )}

      {error && (
        <div className="text-center text-red-400 rounded-md font-medium text-lg py-4 bg-red-900 bg-opacity-30 border-l-4 border-red-500 shadow-md">
          {error}
        </div>
      )}

      {!loading && !error && categories.length > 0 && (
        <Box className="py-4  flex justify-center">
          <ScrollArea
            offsetScrollbars
            // scrollbarSize={8}
            scrollbars="x"
            classNames={{
              root: " !min-h-[90px]",
              thumb: "!bg-dark-secondary",
              scrollbar: "!bg-gray-700 !h-3 rounded-full !hidden",
            }}
          >
            <div className="flex h-[90px] gap-6 items-center justify-evenly py-4">
              {/* All Categories button */}
              <Button
                onClick={() => dispatch(setCategory("All"))}
                // leftSection={
                //   <Avatar
                //     classNames={{
                //       root: "!rounded-full !border !border-medium-gray !border-medium-gray !w-11 !h-11",
                //     }}
                //     variant="outline"
                //     // size="lg"
                //   />
                // }
                classNames={{
                  root: `transition-hover !cursor-pointer !min-w-fit !min-h-fit !h-12 !font-normal ${
                    selectedCategory === "All"
                      ? "!bg-dark !text-white border-2 border-blue-500"
                      : "!text-[#4a5565] !bg-light-gray border border-medium-gray hover:!border-dark hover:!bg-transparent"
                  }`,
                }}
                size="lg"
                radius="xl"
              >
                All
              </Button>

              {categories.map((cat) => (
                <div className="flex flex-col items-center gap-3" key={cat.id}>
                  <Button
                    radius="xl"
                    // leftSection={
                    //   <Avatar
                    //     src={cat.image || fallbackImage}
                    //     alt={cat.name}
                    //     classNames={{
                    //       root: "!rounded-full border border-medium-gray !w-11 !h-11",
                    //     }}
                    //     onError={(e) => {
                    //       e.target.src = fallbackImage; // Set fallback on error
                    //     }}
                    //   />
                    // }
                    onClick={() =>
                      dispatch(
                        setCategory(
                          selectedCategory === cat.name ? "All" : cat.name
                        )
                      )
                    }
                    classNames={{
                      root: `transition-hover !cursor-pointer !h-12 !min-w-fit !min-h-fit !font-normal ${
                        selectedCategory === cat.name
                          ? "!bg-dark !text-white border-2 border-blue-500"
                          : "!text-[#4a5565] !bg-light-gray border border-medium-gray hover:!border-dark hover:!bg-transparent"
                      }`,
                    }}
                    // size="md"
                  >
                    {cat?.name}
                  </Button>
                </div>
              ))}
            </div>
          </ScrollArea>
        </Box>
      )}
    </section>
  );
}
