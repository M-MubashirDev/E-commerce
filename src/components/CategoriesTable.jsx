import {
  Card,
  ScrollArea,
  Text,
  Tooltip,
  Image,
  Pagination,
  Loader,
  TextInput,
  Button,
  Drawer,
  ActionIcon,
  Table,
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
        <ScrollArea h={400}>
          {loading ? (
            <div style={{ padding: "2rem", textAlign: "center" }}>
              <Loader color="dark" size="lg" />
            </div>
          ) : (
            <Table
              highlightOnHover
              verticalSpacing="sm"
              horizontalSpacing="md"
              withColumnBorders={false}
              striped
            >
              <Table.Thead
                style={{
                  backgroundColor: "black",
                  color: "white",
                  fontWeight: 600,
                  fontSize: "0.875rem",
                }}
              >
                <Table.Tr>
                  <Table.Th>ICON</Table.Th>
                  <Table.Th>TITLE</Table.Th>
                  <Table.Th>DESCRIPTION</Table.Th>
                  <Table.Th>CREATED AT</Table.Th>
                  <Table.Th style={{ textAlign: "center" }}>ACTION</Table.Th>
                </Table.Tr>
              </Table.Thead>

              <Table.Tbody>
                {categories.length === 0 ? (
                  <Table.Tr>
                    <Table.Td colSpan={5} style={{ textAlign: "center" }}>
                      <Text c="#9ca3af" fs="italic">
                        No categories found
                      </Text>
                    </Table.Td>
                  </Table.Tr>
                ) : (
                  categories.map((cat) => (
                    <Table.Tr key={cat.id}>
                      <Table.Td>
                        <Image
                          src={cat.icon}
                          alt={cat.title}
                          w={40}
                          h={40}
                          radius="md"
                          fit="contain"
                        />
                      </Table.Td>
                      <Table.Td>
                        <Text fw={600} size="sm">
                          {cat.title}
                        </Text>
                      </Table.Td>
                      <Table.Td>
                        {cat.description ? (
                          <Tooltip label={cat.description} withArrow>
                            <Text
                              size="sm"
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
                      </Table.Td>
                      <Table.Td>
                        {new Date(cat.createdAt).toLocaleDateString()}
                      </Table.Td>
                      <Table.Td align="center">
                        <ActionIcon
                          color="dark"
                          variant="light"
                          radius="xl"
                          onClick={() => handleEdit(cat)}
                        >
                          <FiEdit2 size={18} />
                        </ActionIcon>
                      </Table.Td>
                    </Table.Tr>
                  ))
                )}
              </Table.Tbody>
            </Table>
          )}
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
