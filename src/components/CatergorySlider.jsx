import { Avatar, Button, ScrollArea, Text, Title, Box } from "@mantine/core";
import { useEffect, useState } from "react";
// import { IconGridDots } from "@tabler/icons-react";
import axios from "axios";

export default function ExploreCategories({ category, setCategory }) {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "https://api.escuelajs.co/api/v1/categories/"
        );
        setCategories(response.data);
        setError(null);
      } catch (err) {
        setError("Failed to load categories. Please try again later.");
        console.error("Error fetching categories:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <section
      id="exploreCategories"
      className=" mx-auto  relative py-10 bg-dark"
    >
      <Title
        data-aos="fade-up"
        ta={"center"}
        classNames={{
          root: "lg:!text-[3rem] !text-white !tracking-wider ",
        }}
      >
        Explore Our Categories
      </Title>

      <Text
        data-aos="fade-up"
        lineClamp={3}
        my={"md"}
        ta={"center"}
        size="lg"
        classNames={{
          root: "!max-w-3xl !mx-auto !text-gray-400  !tracking-wider ",
        }}
      >
        Discover our diverse collection, offering quality products crafted to
        perfection. Our goal is to satisfy your needs and elevate your shopping
        experience.
      </Text>

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
                variant={category === "All" ? "filled" : "light"}
                color="blue"
                radius={"xl"}
                onClick={() => setCategory("All")}
                leftSection={
                  <Avatar
                    classNames={{ root: "!bg-blue-600 !rounded-full" }}
                    color="blue"
                    variant="light"
                    radius="sm"
                  >
                    {/* <IconGridDots color="white" size={20} /> */}
                  </Avatar>
                }
                classNames={{
                  root: `hover:!scale-105 !transition-all !duration-300 !cursor-pointer !min-w-44 ${
                    category === "All"
                      ? "!bg-dark-secondary !text-white border-4 border-blue-500"
                      : "!text-gray-300 !bg-gray-700 hover:!bg-dark-secondary hover:!text-white"
                  }`,
                }}
                size={"lg"}
              >
                All Categories
              </Button>

              {categories.map((cat, index) => (
                <div className="flex flex-col items-center gap-3" key={index}>
                  <Button
                    variant={category === cat.name ? "filled" : "light"}
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
                      setCategory((prevState) =>
                        prevState === cat.name ? "All" : cat.name
                      )
                    }
                    classNames={{
                      root: `hover:!scale-105 !min-w-40 !transition-all !duration-300 !cursor-pointer ${
                        category === cat.name
                          ? "!bg-dark-secondary !text-white border-4 border-blue-500"
                          : "!text-gray-300 !bg-gray-700 hover:!bg-dark-secondary hover:!text-white"
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
