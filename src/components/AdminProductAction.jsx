import {
  Card,
  Text,
  Group,
  Modal,
  NumberInput,
  Select,
  Button,
  Textarea,
  TextInput,
  FileInput,
} from "@mantine/core";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addProduct,
  updateProduct,
  deleteProduct,
  fetchProducts,
} from "../features/products/productsThunks";
import { useForm, Controller } from "react-hook-form";
import { AdminProductInitialStates } from "../utilities/Reducers";

export default function AdminProductsAction({
  existingProduct = null,
  onClose,
}) {
  const dispatch = useDispatch();
  const [openDelete, setOpenDelete] = useState(false);
  const { categories } = useSelector((state) => state.categories);
  const { loading } = useSelector((state) => state.products);

  const isEditMode = Boolean(existingProduct);

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState,
    setError,
    clearErrors,
  } = useForm({
    defaultValues: {
      title: existingProduct?.title || "",
      description: existingProduct?.description || "",
      price: existingProduct?.price || "",
      discount: existingProduct?.discount || "",
      quantity: existingProduct?.quantity || "",
      unitQuantity: existingProduct?.unitQuantity || "pcs",
      categoryId: existingProduct?.categoryId || "",
      uploadedFiles: [],
      oldImages: existingProduct?.productImages?.map((img) => img.url) || [],
    },
  });

  const oldImages = watch("oldImages");

  const removeOldImage = (url) => {
    setValue(
      "oldImages",
      oldImages.filter((img) => img !== url),
      { shouldValidate: true }
    );
  };

  const onSubmit = async (values) => {
    if (
      (values.oldImages?.length || 0) + (values.uploadedFiles?.length || 0) ===
      0
    ) {
      setError("uploadedFiles", {
        type: "manual",
        message: "At least one image is required",
      });
      return;
    } else {
      clearErrors("uploadedFiles");
    }

    const formData = new FormData();
    for (const key of [
      "title",
      "description",
      "price",
      "discount",
      "quantity",
      "unitQuantity",
      "categoryId",
    ]) {
      formData.append(key, values[key]);
    }

    if (values.oldImages.length > 0) {
      formData.append("url", JSON.stringify(values.oldImages));
    }

    values.uploadedFiles?.forEach((file) => {
      formData.append("uploaded_file", file);
    });

    try {
      if (isEditMode) {
        await dispatch(
          updateProduct({ id: existingProduct.id, formData })
        ).unwrap();
      } else {
        await dispatch(addProduct(formData)).unwrap();
      }
      dispatch(fetchProducts(AdminProductInitialStates));
      onClose?.();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async () => {
    if (!existingProduct) return;
    try {
      await dispatch(deleteProduct(existingProduct.id)).unwrap();
      onClose?.();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-5">
      <Card shadow="sm" radius="md" p="lg" withBorder>
        <Text size="lg" fw={600} mb="md" align="center">
          {isEditMode ? "Edit Product" : "Add New Product"}
        </Text>

        <form onSubmit={handleSubmit(onSubmit)}>
          <TextInput
            label="Title"
            placeholder="Product title"
            {...register("title", { required: "Title is required" })}
            error={formState.errors.title?.message}
          />

          <Textarea
            label="Description"
            placeholder="Product details..."
            {...register("description")}
            className="my-2"
          />

          <Controller
            name="price"
            control={control}
            rules={{ required: "Price is required" }}
            render={({ field }) => (
              <NumberInput
                label="Price"
                min={1}
                {...field}
                error={formState.errors.price?.message}
                className="my-2"
              />
            )}
          />

          <Controller
            name="discount"
            control={control}
            render={({ field }) => (
              <NumberInput
                label="Discount %"
                min={0}
                max={100}
                {...field}
                className="my-2"
              />
            )}
          />

          <Controller
            name="quantity"
            control={control}
            rules={{ required: "Quantity is required" }}
            render={({ field }) => (
              <NumberInput
                label="Quantity"
                min={1}
                {...field}
                error={formState.errors.quantity?.message}
                className="my-2"
              />
            )}
          />

          <TextInput
            label="Unit"
            placeholder="pcs, kg, box"
            {...register("unitQuantity", { required: "Unit is required" })}
            error={formState.errors.unitQuantity?.message}
            className="my-2"
          />

          <Controller
            name="categoryId"
            control={control}
            rules={{ required: "Category is required" }}
            render={({ field }) => (
              <Select
                label="Category"
                placeholder="Select category"
                data={categories.rows.map((cat) => ({
                  value: String(cat.id),
                  label: cat.title,
                }))}
                value={field.value}
                onChange={field.onChange}
                error={formState.errors.categoryId?.message}
                className="my-2"
              />
            )}
          />

          <Controller
            name="uploadedFiles"
            control={control}
            render={({ field }) => (
              <FileInput
                label="Upload Images"
                placeholder="Choose images"
                multiple
                onChange={(files) => {
                  field.onChange(files);
                  if (files.length + (oldImages?.length || 0) > 0)
                    clearErrors("uploadedFiles");
                }}
                className="my-2"
                accept="image/*"
                error={formState.errors.uploadedFiles?.message}
              />
            )}
          />

          {isEditMode && oldImages?.length > 0 && (
            <div className="my-3">
              <Text size="sm" fw={500}>
                Existing Images:
              </Text>
              <div className="flex gap-2 mt-2 flex-wrap">
                {oldImages.map((url, i) => (
                  <div key={i} className="relative">
                    <img
                      src={url}
                      className="w-16 h-16 rounded border object-cover"
                    />
                    <Button
                      size="xs"
                      className="absolute -top-2 -right-2 !bg-red-400"
                      onClick={() => removeOldImage(url)}
                    >
                      X
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <Group justify="space-between" mt="md">
            <Button type="submit" disabled={loading}>
              {isEditMode ? "Save Changes" : "Add Product"}
            </Button>

            {isEditMode && (
              <Button
                className="!bg-red-400"
                onClick={() => setOpenDelete(true)}
                disabled={loading}
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
          Are you sure you want to delete this product? This action cannot be
          undone.
        </Text>
        <Group justify="flex-end">
          <Button variant="default" onClick={() => setOpenDelete(false)}>
            Cancel
          </Button>
          <Button
            className="!bg-red-400"
            onClick={handleDelete}
            disabled={loading}
          >
            Delete
          </Button>
        </Group>
      </Modal>
    </div>
  );
}
