import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateAdminName } from "../../features/adminAuth/authThunks";
import { Card, Text, TextInput, Button, Loader, Group } from "@mantine/core";
import toast from "react-hot-toast";

export default function Settings() {
  const dispatch = useDispatch();
  const { userAdmin, loading } = useSelector((state) => state.adminAuth);

  const [name, setName] = useState(userAdmin?.name || "");
  const handleUpdate = async () => {
    await dispatch(updateAdminName(name)).unwrap();
    toast.success("user name updated succesfully");
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

        <TextInput
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          mb="sm"
        />

        <TextInput label="Email" value={userAdmin.email} readOnly mb="sm" />

        <Group justify="flex-end" mt="md">
          <Button
            color="dark"
            onClick={handleUpdate}
            disabled={loading}
            leftSection={loading && <Loader color="white" size="xs" />}
          >
            Update Name
          </Button>
        </Group>
      </Card>
    </div>
  );
}
