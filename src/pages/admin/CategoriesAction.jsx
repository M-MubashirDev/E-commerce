import {
  Card,
  TextInput,
  Button,
  Title,
  Textarea,
  Group,
  Modal,
  Text,
  FileInput,
} from "@mantine/core";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import {
  addCategory,
  updateCategory,
  deleteCategory,
  fetchCategories,
} from "../../features/categories/categoriesThunks";
import { uploadToCloudinary } from "../../utilities/uploadCloudinary";

export default function CategoriesAction({ existingCategory = null, onClose }) {
  const dispatch = useDispatch();
  const isEditMode = Boolean(existingCategory);
  const [uploading, setUploading] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  // ------------------ RHF FORM INSTANCE ------------------
  const { register, handleSubmit, formState, watch, setValue } = useForm({
    defaultValues: {
      title: existingCategory?.title || "",
      description: existingCategory?.description || "",
      icon: existingCategory?.icon || "",
    },
  });
  const iconValue = watch("icon");
  // ------------------ Save Handler ------------------
  const onSubmit = async (data) => {
    try {
      if (isEditMode) {
        await dispatch(
          updateCategory({ id: existingCategory.id, updates: data })
        ).unwrap();
      } else {
        await dispatch(addCategory(data)).unwrap();
      }

      dispatch(fetchCategories({ page: 0, title: "" }));
      onClose?.();
    } catch (err) {
      console.error(err);
    }
  };

  // ------------------ Delete Handler ------------------
  const handleDelete = async () => {
    if (!existingCategory) return;
    try {
      await dispatch(deleteCategory(existingCategory.id)).unwrap();
      await dispatch(fetchCategories({ page: 0, title: "" })).unwrap();
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

        <form onSubmit={handleSubmit(onSubmit)}>
          <TextInput
            label="Title"
            placeholder="Category title"
            {...register("title", {
              required: "Title is required",
              minLength: {
                value: 3,
                message: "Title must be at least 3 characters",
              },
            })}
            error={formState.errors.title?.message}
            mb="md"
          />

          <Textarea
            label="Description"
            placeholder="Category description"
            {...register("description")}
            mb="md"
          />

          <FileInput
            label="Icon Image"
            placeholder="Upload icon"
            accept="image/*"
            clearable
            disabled={uploading}
            onChange={async (file) => {
              if (!file) {
                setValue("icon", ""); // clear icon
                return;
              }
              setUploading(true);
              try {
                const url = await uploadToCloudinary(file);
                setValue("icon", url); // store cloudinary URL into form value
              } finally {
                setUploading(false);
              }
            }}
            mb="md"
          />
          {iconValue && (
            <div className="mb-4">
              <img
                src={iconValue}
                alt="Uploaded icon"
                className="w-20 h-20 object-cover rounded-md border"
              />
              <Text size="xs" mt={4}>
                Preview
              </Text>
            </div>
          )}

          <Group justify="space-between">
            <Button type="submit" disabled={uploading}>
              {isEditMode ? "Save Changes" : "Create Category"}
            </Button>

            {isEditMode && (
              <Button
                className="!bg-red-400"
                variant="filled"
                disabled={uploading}
                onClick={() => setOpenDelete(true)}
              >
                Delete
              </Button>
            )}
          </Group>
        </form>
      </Card>
      <Modal
        opened={openDelete}
        onClose={() => setOpenDelete(false)}
        title="Confirm Deletion"
        centered
      >
        <Text size="sm" mb="md">
          Are you sure you want to delete this category? This action cannot be
          undone.
        </Text>
        <Group justify="flex-end">
          <Button variant="default" onClick={() => setOpenDelete(false)}>
            Cancel
          </Button>
          <Button className="!bg-red-400" onClick={handleDelete}>
            Delete
          </Button>
        </Group>
      </Modal>
    </div>
  );
}
