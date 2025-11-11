import {
  Card,
  TextInput,
  Textarea,
  NumberInput,
  Button,
  Group,
  Modal,
  Text,
  FileInput,
  Select,
} from "@mantine/core";
import { useReducer, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addProduct,
  updateProduct,
  deleteProduct,
} from "../features/products/productsThunks";

const initialState = {
  title: "",
  description: "",
  price: 0,
  discount: 0,
  quantity: 0,
  unitQuantity: "pcs",
  categoryId: null,
  uploadedFiles: [],
  oldImages: [],
};

function reducer(state, action) {
  switch (action.type) {
    case "setField":
      return { ...state, [action.field]: action.value };
    case "setAll":
      return { ...state, ...action.payload };
    case "reset":
      return { ...initialState };
    default:
      return state;
  }
}

export default function AdminProductsAction({
  existingProduct = null,
  onClose,
}) {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.categories);

  const [state, dispatchReducer] = useReducer(reducer, initialState);
  const [openDelete, setOpenDelete] = useState(false);
  const [loading, setLoading] = useState(false);

  const isEditMode = Boolean(existingProduct);

  useEffect(() => {
    if (existingProduct) {
      dispatchReducer({
        type: "setAll",
        payload: {
          title: existingProduct.title || "",
          description: existingProduct.description || "",
          price: existingProduct.price || 0,
          discount: existingProduct.discount || 0,
          quantity: existingProduct.quantity || 0,
          unitQuantity: existingProduct.unitQuantity || "pcs",
          categoryId: existingProduct.categoryId || null,
          oldImages: existingProduct.productImages?.map((img) => img.url) || [],
          uploadedFiles: [],
        },
      });
    } else {
      dispatchReducer({ type: "reset" });
    }
  }, [existingProduct]);

  const handleSave = async () => {
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
      formData.append(key, state[key]);
    }

    // ✅ Only include old images when editing
    if (isEditMode && state.oldImages.length > 0) {
      formData.append("url", JSON.stringify(state.oldImages));
    }

    // ✅ Add new uploads
    state.uploadedFiles.forEach((file) =>
      formData.append("uploaded_file", file)
    );

    try {
      setLoading(true);
      if (isEditMode) {
        await dispatch(
          updateProduct({ id: existingProduct.id, formData })
        ).unwrap();
      } else {
        await dispatch(addProduct(formData)).unwrap();
      }
      onClose?.();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!existingProduct) return;
    try {
      setLoading(true);
      await dispatch(deleteProduct(existingProduct.id)).unwrap();
      onClose?.();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-5">
      <Card shadow="sm" radius="md" p="lg" withBorder>
        <Text size="lg" fw={600} mb="md" align="center">
          {isEditMode ? "Edit Product" : "Add New Product"}
        </Text>

        <TextInput
          label="Title"
          value={state.title}
          onChange={(e) =>
            dispatchReducer({
              type: "setField",
              field: "title",
              value: e.target.value,
            })
          }
          mb="sm"
          required
        />

        <Textarea
          label="Description"
          value={state.description}
          onChange={(e) =>
            dispatchReducer({
              type: "setField",
              field: "description",
              value: e.target.value,
            })
          }
          mb="sm"
        />

        <NumberInput
          label="Price"
          value={state.price}
          onChange={(val) =>
            dispatchReducer({ type: "setField", field: "price", value: val })
          }
          min={0}
          mb="sm"
        />
        <NumberInput
          label="Discount"
          value={state.discount}
          onChange={(val) =>
            dispatchReducer({ type: "setField", field: "discount", value: val })
          }
          min={0}
          max={100}
          mb="sm"
        />
        <NumberInput
          label="Quantity"
          value={state.quantity}
          onChange={(val) =>
            dispatchReducer({ type: "setField", field: "quantity", value: val })
          }
          min={0}
          mb="sm"
        />

        <TextInput
          label="Unit"
          value={state.unitQuantity}
          onChange={(e) =>
            dispatchReducer({
              type: "setField",
              field: "unitQuantity",
              value: e.target.value,
            })
          }
          mb="sm"
        />

        <Select
          label="Category"
          value={state.categoryId?.toString() || ""}
          onChange={(val) =>
            dispatchReducer({
              type: "setField",
              field: "categoryId",
              value: Number(val),
            })
          }
          data={categories.rows.map((cat) => ({
            value: cat.id.toString(),
            label: cat.title,
          }))}
          mb="sm"
        />

        <FileInput
          multiple
          label="Upload Images"
          placeholder="Select product images"
          value={state.uploadedFiles}
          onChange={(files) =>
            dispatchReducer({
              type: "setField",
              field: "uploadedFiles",
              value: files,
            })
          }
          mb="sm"
        />

        {isEditMode && state.oldImages.length > 0 && (
          <div className="mb-3">
            <Text size="sm" fw={500}>
              Old Images:
            </Text>
            <div className="flex gap-2 mt-1 flex-wrap">
              {state.oldImages.map((url, idx) => (
                <div
                  key={idx}
                  className="w-16 h-16 border rounded overflow-hidden"
                >
                  <img
                    src={url}
                    alt="old"
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        <Group position="apart" mt="md">
          <Button color="dark" onClick={handleSave} loading={loading}>
            {isEditMode ? "Save Changes" : "Add Product"}
          </Button>

          {isEditMode && (
            <Button
              className="!bg-red-400"
              onClick={() => setOpenDelete(true)}
              loading={loading}
            >
              Delete
            </Button>
          )}
        </Group>
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
        <Group position="right">
          <Button variant="default" onClick={() => setOpenDelete(false)}>
            Cancel
          </Button>
          <Button
            className="!bg-red-400"
            onClick={handleDelete}
            loading={loading}
          >
            Delete
          </Button>
        </Group>
      </Modal>
    </div>
  );
}
