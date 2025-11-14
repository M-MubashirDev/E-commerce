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
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  addCategory,
  updateCategory,
  deleteCategory,
  fetchCategories,
} from "../../features/categories/categoriesThunks";

export default function CategoriesAction({ existingCategory = null, onClose }) {
  const dispatch = useDispatch();

  const isEditMode = Boolean(existingCategory);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [icon, setIcon] = useState(
    "https://cdn-icons-png.flaticon.com/512/1040/1040230.png"
  );
  const [open, setOpen] = useState(false);

  // Populate fields when editing
  useEffect(() => {
    if (existingCategory) {
      setTitle(existingCategory.title || "");
      setDescription(existingCategory.description || "");
      setIcon(
        existingCategory.icon ||
          "https://cdn-icons-png.flaticon.com/512/1040/1040230.png"
      );
    } else {
      setTitle("");
      setDescription("");
      setIcon("https://cdn-icons-png.flaticon.com/512/1040/1040230.png");
    }
  }, [existingCategory]);

  const handleSave = async () => {
    try {
      if (isEditMode) {
        await dispatch(
          updateCategory({
            id: existingCategory.id,
            updates: { title, description, icon },
          })
        ).unwrap();
      } else {
        await dispatch(addCategory({ title, description, icon })).unwrap();
      }
      dispatch(fetchCategories({ page: 0, title: "" }));
      onClose?.();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async () => {
    try {
      if (!existingCategory) return;
      await dispatch(deleteCategory(existingCategory.id)).unwrap();
      await dispatch(
        fetchCategories({ page: 0, title: "", limit: 20 })
      ).unwrap();
      onClose?.();
    } catch (err) {
      console.error(err);
    }
  };

  if (isEditMode && !existingCategory) {
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
