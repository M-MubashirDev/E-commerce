"use client";

import {
  Card,
  TextInput,
  Button,
  Title,
  Textarea,
  Group,
  Modal,
  Text,
} from "@mantine/core";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addCategory,
  updateCategory,
  deleteCategory,
} from "../../features/categories/categoriesThunks";

export default function CategoriesAction() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.categories);

  const isEditMode = Boolean(id);

  const category = isEditMode
    ? categories.rows.find((cat) => cat.id === Number(id))
    : null;

  const [title, setTitle] = useState(category?.title || "");
  const [description, setDescription] = useState(category?.description || "");
  const [icon, setIcon] = useState(
    category?.icon || "https://cdn-icons-png.flaticon.com/512/1040/1040230.png"
  );
  const [open, setOpen] = useState(false);

  const handleSave = async () => {
    if (isEditMode) {
      await dispatch(
        updateCategory({ id, updates: { title, description, icon } })
      ).unwrap();
    } else {
      await dispatch(addCategory({ title, description, icon })).unwrap();
    }
    navigate("/categories");
  };

  const handleDelete = async () => {
    await dispatch(deleteCategory(id)).unwrap();
    navigate("/categories");
  };

  if (isEditMode && !category) {
    return <Text align="center">Category not found</Text>;
  }

  return (
    <div className="max-w-lg mx-auto mt-10">
      <Card shadow="sm" radius="md" p="lg" withBorder>
        <Title order={3} mb="lg" align="center">
          {isEditMode ? "Edit Category" : "Add New Category"}
        </Title>

        <TextInput
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          mb="md"
          required
        />
        <Textarea
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          mb="md"
        />
        <TextInput
          label="Icon URL"
          value={icon}
          onChange={(e) => setIcon(e.target.value)}
          mb="lg"
        />

        <Group justify="space-between">
          <Button color="dark" onClick={handleSave}>
            {isEditMode ? "Save Changes" : "Create Category"}
          </Button>

          {isEditMode && (
            <Button
              className="!bg-red-400"
              variant="filled"
              onClick={() => setOpen(true)}
            >
              Delete
            </Button>
          )}
        </Group>
      </Card>

      <Modal
        opened={open}
        onClose={() => setOpen(false)}
        title="Confirm Deletion"
        centered
      >
        <Text size="sm" mb="md">
          Are you sure you want to delete this category? This action cannot be
          undone.
        </Text>
        <Group justify="flex-end">
          <Button variant="default" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button
            className="!bg-red-400"
            variant="filled"
            onClick={handleDelete}
          >
            Delete
          </Button>
        </Group>
      </Modal>
    </div>
  );
}
