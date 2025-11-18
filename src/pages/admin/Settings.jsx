import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { updateAdminName } from "../../features/adminAuth/authThunks";
import { Card, Text, TextInput, Button, Loader, Group } from "@mantine/core";
import toast from "react-hot-toast";

export default function Settings() {
  const dispatch = useDispatch();
  const { userAdmin, loading } = useSelector((state) => state.adminAuth);

  const { register, handleSubmit, formState, setValue } = useForm({
    defaultValues: {
      name: userAdmin?.name || "",
    },
  });

  const onSubmit = async (data) => {
    try {
      await dispatch(updateAdminName(data.name)).unwrap();
      toast.success("User name updated successfully");
      setValue("name", data.name);
    } catch (err) {
      toast.error("Failed to update name");
      console.error(err);
    }
  };

  if (!userAdmin) {
    return (
      <div className="flex justify-center mt-10">
        <Text>No admin data found</Text>
      </div>
    );
  }

  return (
    <div className="flex justify-center mt-10">
      <Card shadow="md" radius="lg" withBorder w={400}>
        <Text fw={600} size="lg" mb="md">
          Admin Settings
        </Text>

        <form onSubmit={handleSubmit(onSubmit)}>
          <TextInput
            label="Name"
            {...register("name", {
              required: "Name is required",
              minLength: {
                value: 3,
                message: "Name must be at least 3 characters",
              },
            })}
            error={formState.errors.name?.message}
            mb="sm"
          />

          <TextInput label="Email" value={userAdmin.email} readOnly mb="sm" />

          <Group justify="flex-end" mt="md">
            <Button
              type="submit"
              color="dark"
              disabled={loading}
              leftSection={loading && <Loader color="white" size="xs" />}
            >
              Update Name
            </Button>
          </Group>
        </form>
      </Card>
    </div>
  );
}
