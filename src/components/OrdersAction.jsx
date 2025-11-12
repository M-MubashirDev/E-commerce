import {
  TextInput,
  Select,
  Button,
  Group,
  Stack,
  LoadingOverlay,
  Modal,
  Text,
} from "@mantine/core";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateOrder,
  deleteOrder,
  fetchOrders,
} from "../features/orders/orderThunks";

export default function OrdersAction({ existingOrder, onClose }) {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const { loading } = useSelector((state) => state.orders);

  const [form, setForm] = useState({
    address: existingOrder?.address || "",
    city: existingOrder?.city || "",
    phone: existingOrder?.phone || "",
    status: existingOrder?.status || "pending",
  });

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(
        updateOrder({ id: existingOrder.id, data: form })
      ).unwrap();
      await dispatch(
        fetchOrders({
          page: 0,
          limit: 10,
          address: "",
        })
      ).unwrap();
      onClose();
    } catch (error) {
      console.log(error, "error");
    }
  };

  const handleDelete = async () => {
    try {
      await dispatch(deleteOrder(existingOrder.id)).unwrap();
      await dispatch(
        fetchOrders({
          page: 0,
          limit: 10,
          address: "",
        })
      ).unwrap();
      onClose();
    } catch (error) {
      console.log(error, "error");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <LoadingOverlay visible={loading} />

        <Stack>
          <TextInput
            label="Address"
            placeholder="Enter address"
            value={form.address}
            onChange={(e) => handleChange("address", e.target.value)}
            required
          />

          <TextInput
            label="City"
            placeholder="Enter city"
            value={form.city}
            onChange={(e) => handleChange("city", e.target.value)}
            required
          />

          <TextInput
            label="Phone"
            placeholder="Enter phone number"
            value={form.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
            required
          />

          <Select
            label="Status"
            data={[
              { value: "pending", label: "Pending" },
              { value: "shipped", label: "Shipped" },
              { value: "delivered", label: "Delivered" },
              { value: "cancelled", label: "Cancelled" },
            ]}
            value={form.status}
            onChange={(value) => handleChange("status", value)}
          />

          <Group mt="md">
            <Button type="submit" color="dark">
              Update
            </Button>

            <Button
              className="!bg-red-400"
              onClick={() => setOpen(true)}
              disabled={loading}
            >
              Delete
            </Button>
          </Group>
        </Stack>
      </form>
      <Modal
        opened={open}
        onClose={() => setOpen(false)}
        title="Confirm Deletion"
        centered
      >
        <Text size="sm" mb="md">
          Are you sure you want to delete this Order? This action cannot be
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
    </>
  );
}
