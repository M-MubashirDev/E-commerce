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
import { useForm } from "react-hook-form";
import {
  updateOrder,
  deleteOrder,
  fetchOrders,
} from "../features/orders/orderThunks";

export default function OrdersAction({ existingOrder, onClose }) {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const { loading } = useSelector((state) => state.orders);

  console.log(existingOrder, "existinOrder");
  // ------------------ RHF FORM INSTANCE ------------------
  const { register, handleSubmit, watch, formState, setValue } = useForm({
    defaultValues: {
      address: existingOrder?.address || "",
      city: existingOrder?.city || "",
      phone: existingOrder?.phone || "",
      status: existingOrder?.status || "pending",
    },
  });

  const watchStatus = watch("status");

  // ------------------ Submit Handler ------------------
  const onSubmit = async (data) => {
    try {
      await dispatch(updateOrder({ id: existingOrder.id, data })).unwrap();
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

  // ------------------ Delete Handler ------------------
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
      <form onSubmit={handleSubmit(onSubmit)}>
        <LoadingOverlay visible={loading} />

        <Stack>
          <TextInput
            label="Address"
            placeholder="Enter address"
            {...register("address", { required: "Address is required" })}
            error={formState.errors.address?.message}
          />
          <TextInput
            label="City"
            placeholder="Enter city"
            {...register("city", { required: "City is required" })}
            error={formState.errors.city?.message}
          />
          <TextInput
            label="Phone"
            placeholder="Enter phone number"
            {...register("phone", {
              required: "Phone number is required",
              pattern: {
                value: /^[0-9]+$/,
                message: "Phone number must contain only digits",
              },
              minLength: {
                value: 7,
                message: "Phone number must be at least 7 digits",
              },
              maxLength: {
                value: 15,
                message: "Phone number cannot exceed 15 digits",
              },
            })}
            error={formState.errors.phone?.message}
          />
          <Select
            label="Status"
            data={[
              { value: "pending", label: "Pending" },
              { value: "shipped", label: "Shipped" },
              { value: "delivered", label: "Delivered" },
              { value: "cancelled", label: "Cancelled" },
            ]}
            value={watchStatus}
            onChange={(value) => setValue("status", value)}
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
