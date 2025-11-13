import { Avatar, Button, ScrollArea, Box } from "@mantine/core";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import { setCategory } from "../features/categories/categoriesSlice";
import { fetchCategories } from "../features/categories/categoriesThunks";
import { Spinner } from "../ui/Spinners";
import ErrorMessage from "../ui/ErrorMessage";

export default function ExploreCategories() {
  const fallbackImage = "logo.png";

  const dispatch = useDispatch();
  const { categories, loading, error, selectedCategory } = useSelector(
    (state) => state.categories
  );

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  if (loading) return <Spinner />;
  if (error) return <ErrorMessage error={error} />;
  return (
    <section className="relative   px-6  mx-auto  bg-lights ">
      {categories.rows.length > 0 && (
        <Box className="py-4  flex justify-center">
          <ScrollArea
            offsetScrollbars
            scrollbars="x"
            classNames={{
              root: " !min-h-[90px]",
              thumb: "!bg-dark-secondary",
              scrollbar: "!bg-gray-700 !h-3 rounded-full !hidden",
            }}
          >
            <div className="flex h-[90px] gap-6 items-center justify-evenly py-4">
              <Button
                onClick={() => dispatch(setCategory("All"))}
                leftSection={
                  <Avatar
                    classNames={{
                      root: "!rounded-full !border !border-medium-gray !border-medium-gray !w-11 !h-11",
                    }}
                    variant="outline"
                  />
                }
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

              {categories.rows.map((cat) => (
                <div className="flex flex-col items-center gap-3" key={cat.id}>
                  <Button
                    radius="xl"
                    leftSection={
                      <Avatar
                        src={cat.icon || fallbackImage}
                        alt={cat.title}
                        classNames={{
                          root: "!rounded-full  !w-11 !h-11",
                        }}
                        onError={(e) => {
                          e.target.src = fallbackImage;
                        }}
                      />
                    }
                    onClick={() =>
                      dispatch(
                        setCategory(
                          selectedCategory === cat.title ? "All" : cat
                        )
                      )
                    }
                    classNames={{
                      root: `transition-hover !cursor-pointer !h-12 !min-w-fit !min-h-fit !font-normal ${
                        selectedCategory.title === cat.title
                          ? "!bg-dark !text-white border-2 border-blue-500"
                          : "!text-[#4a5565] !bg-light-gray shadow-sm hover:!text-white hover:!shadow-lg hover:!bg-black"
                      }`,
                    }}
                  >
                    {cat?.title}
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
