"use client";

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
} from "@mantine/core";
import { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";

export default function CategoriesTable({
  categories,
  loading,
  totalPages,
  currentPage,
  onPageChange,
  onSearch,
}) {
  const [searchTerm, setSearchTerm] = useState("");

  // Debounced search (so backend isn’t hit on every keystroke)
  useEffect(() => {
    const delay = setTimeout(() => {
      onSearch(searchTerm);
    }, 500);
    return () => clearTimeout(delay);
  }, [searchTerm, onSearch]);

  return (
    <Card
      shadow="none"
      p={0}
      radius="lg"
      withBorder
      style={{
        borderColor: "#e5e7eb",
        overflow: "hidden",
        backgroundColor: "#ffffff",
      }}
    >
      {/* Top bar with search */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <Text fw={600} size="lg" c="#111827">
          Category List
        </Text>
        <TextInput
          placeholder="Search category..."
          leftSection={<FiSearch size={16} />}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          radius="md"
          w={250}
        />
      </div>

      {/* Header */}
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
          <Text span style={{ flex: 1.5 }} className="!text-white">
            ICON
          </Text>
          <Text span style={{ flex: 2 }} className="!text-white">
            TITLE
          </Text>
          <Text span style={{ flex: 4 }} className="!text-white">
            DESCRIPTION
          </Text>
          <Text
            span
            style={{ flex: 2, textAlign: "right" }}
            className="!text-white"
          >
            CREATED AT
          </Text>
        </Group>
      </div>

      {/* Body */}
      <ScrollArea h={400}>
        <div style={{ minWidth: 800 }}>
          {loading ? (
            <div
              style={{
                padding: "2rem",
                textAlign: "center",
                color: "#9ca3af",
              }}
            >
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
                {/* Icon */}
                <div style={{ flex: 1.5 }}>
                  <Image
                    src={cat.icon}
                    alt={cat.title}
                    w={40}
                    h={40}
                    radius="md"
                    fit="contain"
                    fallbackSrc="https://via.placeholder.com/40"
                  />
                </div>

                {/* Title */}
                <div style={{ flex: 2 }}>
                  <Text fw={600} size="sm" c="#111827">
                    {cat.title}
                  </Text>
                </div>

                {/* Description with tooltip */}
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
                          maxWidth: "100%",
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

                {/* Created At */}
                <div style={{ flex: 2, textAlign: "right" }}>
                  <Text size="sm" fw={500} c="#111827">
                    {new Date(cat.createdAt).toLocaleDateString()}
                  </Text>
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
            siblings={1}
            boundaries={1}
            color="dark"
          />
        </div>
      )}
    </Card>
  );
}
