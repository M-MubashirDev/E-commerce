import { Avatar, Button, ScrollArea, Text, Title, Box } from "@mantine/core";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCategories,
  setCategory,
} from "../features/categories/categoriesSlice";
import SectionHeading from "../ui/Headings";

export default function ExploreCategories() {
  const dispatch = useDispatch();
  const { categories, loading, error, selectedCategory } = useSelector(
    (state) => state.categories
  );

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <section id="exploreCategories" className="mx-auto relative py-10 bg-dark">
      <SectionHeading
        title="Explore Our Categories"
        subtitle="Discover our diverse collection, offering quality products crafted to perfection. Our goal is to satisfy your needs and elevate your shopping experience."
      />

      {loading && (
        <div className="text-center text-gray-300 rounded-md font-bold text-lg py-4 bg-gray-800 border-l-4 border-blue-500 shadow-md">
          Loading categories...
        </div>
      )}

      {error && (
        <div className="text-center text-red-400 rounded-md font-bold text-lg py-4 bg-red-900 bg-opacity-30 border-l-4 border-red-500 shadow-md">
          {error}
        </div>
      )}

      {!loading && !error && categories.length > 0 && (
        <Box
          data-aos="fade-up"
          className="bg-dark mx-2 px-4 py-4 rounded-xl shadow-sm flex justify-center border border-gray-700"
        >
          <ScrollArea
            offsetScrollbars
            scrollbarSize={8}
            scrollbars="x"
            classNames={{
              root: "max-w-[122rem] !min-h-[90px] !rounded-full",
              thumb: "!bg-dark-secondary",
              scrollbar: "!bg-gray-700 !h-3 rounded-full",
            }}
          >
            <div className="flex h-[90px] gap-6 items-center justify-evenly py-4">
              {/* All items button */}
              <Button
                variant={selectedCategory === "All" ? "filled" : "light"}
                color="blue"
                radius={"xl"}
                onClick={() => dispatch(setCategory("All"))}
                leftSection={
                  <Avatar
                    classNames={{ root: "!bg-blue-600 !rounded-full" }}
                    color="blue"
                    variant="light"
                    radius="sm"
                  />
                }
                classNames={{
                  root: `transition-hover !cursor-pointer !min-w-44 ${
                    selectedCategory === "All"
                      ? "!bg-dark-secondary !text-white border-4 border-blue-500"
                      : "!text-gray-300 !bg-glasses hover:!bg-dark-secondary hover:!text-white"
                  }`,
                }}
                size={"lg"}
              >
                All Categories
              </Button>

              {categories.map((cat) => (
                <div className="flex flex-col items-center gap-3" key={cat.id}>
                  <Button
                    variant={selectedCategory === cat.name ? "filled" : "light"}
                    color="blue"
                    radius={"xl"}
                    leftSection={
                      <Avatar
                        src={cat.image}
                        alt={cat.name}
                        size="md"
                        classNames={{
                          root: "!rounded-full border border-gray-600",
                        }}
                      />
                    }
                    onClick={() =>
                      dispatch(
                        setCategory(
                          selectedCategory === cat.name ? "All" : cat.name
                        )
                      )
                    }
                    classNames={{
                      root: `transition-hover !cursor-pointer !min-w-40 ${
                        selectedCategory === cat.name
                          ? "!bg-dark-secondary !text-white border-4 border-blue-500"
                          : "!text-gray-300 !bg-glasses hover:!bg-dark-secondary hover:!text-white"
                      }`,
                    }}
                    size={"lg"}
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
