import {
  Card,
  ScrollArea,
  Text,
  Group,
  Tooltip,
  Image,
  Pagination,
  Loader,
  TextInput,
  Button,
  Drawer,
  ActionIcon,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { FiSearch, FiEdit2 } from "react-icons/fi";
import CategoriesAction from "../pages/admin/CategoriesAction";

export default function CategoriesTable({
  categories,
  loading,
  totalPages,
  currentPage,
  onPageChange,
  onSearch,
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [drawerOpened, setDrawerOpened] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    const delay = setTimeout(() => {
      onSearch(searchTerm);
    }, 500);
    return () => clearTimeout(delay);
  }, [searchTerm, onSearch]);

  const handleEdit = (cat) => {
    setSelectedCategory(cat);
    setDrawerOpened(true);
  };

  const handleAdd = () => {
    setSelectedCategory(null);
    setDrawerOpened(true);
  };

  return (
    <>
      <Card shadow="none" p={0} radius="lg" withBorder>
        {/* Header */}
        <div className="flex items-center flex-col justify-between sm:flex-row p-4 border-b border-gray-200">
          <Text fw={600} size="lg" c="#111827" className="sm:inline hidden">
            Category List
          </Text>
          <div className="flex items-center sm:flex-row flex-col gap-2">
            <TextInput
              placeholder="Search category..."
              leftSection={<FiSearch size={16} />}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              radius="md"
              className="sm:w-[250px] w-[200px]"
            />
            <Button size="sm" onClick={handleAdd}>
              Add New
            </Button>
          </div>
        </div>

        {/* Table Header */}
        <div
          style={{
            backgroundColor: "black",
            padding: "12px 16px",
            borderBottom: "1px solid #e5e7eb",
          }}
        >
          <Group
            justify="space-between"
            style={{ color: "white", fontWeight: 600, fontSize: "0.875rem" }}
          >
            <Text className="!text-white" span style={{ flex: 1.5 }}>
              ICON
            </Text>
            <Text className="!text-white" span style={{ flex: 2 }}>
              TITLE
            </Text>
            <Text className="!text-white" span style={{ flex: 4 }}>
              DESCRIPTION
            </Text>
            <Text className="!text-white" span style={{ flex: 2 }}>
              CREATED AT
            </Text>
            <Text
              className="!text-white"
              span
              style={{ flex: 1, textAlign: "center" }}
            >
              ACTION
            </Text>
          </Group>
        </div>

        {/* Table Content */}
        <ScrollArea h={400}>
          <div style={{ minWidth: 800 }}>
            {loading ? (
              <div style={{ padding: "2rem", textAlign: "center" }}>
                <Loader color="dark" size="lg" />
              </div>
            ) : categories?.length === 0 ? (
              <div
                style={{
                  padding: "2rem",
                  textAlign: "center",
                  color: "#9ca3af",
                  fontStyle: "italic",
                }}
              >
                No categories found
              </div>
            ) : (
              categories.map((cat, index) => (
                <div
                  key={cat.id}
                  style={{
                    backgroundColor: index % 2 === 0 ? "#ffffff" : "#f9f9f9",
                    borderBottom: "1px solid #e5e7eb",
                    padding: "12px 16px",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <div style={{ flex: 1.5 }}>
                    <Image
                      src={cat.icon}
                      alt={cat.title}
                      w={40}
                      h={40}
                      radius="md"
                      fit="contain"
                    />
                  </div>

                  <div style={{ flex: 2 }}>
                    <Text fw={600} size="sm" c="#111827">
                      {cat.title}
                    </Text>
                  </div>

                  <div style={{ flex: 4 }}>
                    {cat.description ? (
                      <Tooltip
                        label={cat.description}
                        position="top-start"
                        withArrow
                      >
                        <Text
                          size="sm"
                          c="#374151"
                          style={{
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {cat.description}
                        </Text>
                      </Tooltip>
                    ) : (
                      <Text size="sm" c="#9ca3af" fs="italic">
                        No description
                      </Text>
                    )}
                  </div>

                  <div style={{ flex: 2 }}>
                    <Text size="sm" fw={500} c="#111827">
                      {new Date(cat.createdAt).toLocaleDateString()}
                    </Text>
                  </div>

                  <div style={{ flex: 1, textAlign: "center" }}>
                    <ActionIcon
                      color="dark"
                      w={"60"}
                      variant="light"
                      radius="xl"
                      onClick={() => handleEdit(cat)}
                    >
                      <FiEdit2 size={18} />
                    </ActionIcon>
                  </div>
                </div>
              ))
            )}
          </div>
        </ScrollArea>

        {/* Pagination */}
        {!loading && (
          <div className="py-3 flex justify-center border-t border-gray-200">
            <Pagination
              total={totalPages}
              value={currentPage + 1}
              onChange={(page) => onPageChange(page - 1)}
              color="dark"
            />
          </div>
        )}
      </Card>

      {/* 🔹 Drawer for Add/Edit actions */}
      <Drawer
        opened={drawerOpened}
        onClose={() => setDrawerOpened(false)}
        title={selectedCategory ? "Edit Category" : "Add New Category"}
        position="right"
        size="lg"
        overlayProps={{ opacity: 0.4, blur: 3 }}
      >
        <CategoriesAction
          existingCategory={selectedCategory}
          onClose={() => setDrawerOpened(false)}
        />
      </Drawer>
    </>
  );
}
