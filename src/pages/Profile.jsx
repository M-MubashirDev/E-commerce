import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm, FormProvider } from "react-hook-form";
import { Avatar, Button, Modal, Tabs, Card, Text, Group } from "@mantine/core";
import {
  TextInputField,
  PasswordInputField,
  SubmitButton,
} from "../components/Form";
import {
  updateUserProfile,
  changePassword,
  deleteUserAccount,
} from "../features/auth/authThunks";
import toast from "react-hot-toast";
import { FaUser, FaLock, FaTrash, FaEdit, FaBox } from "react-icons/fa";
import OrdersHistory from "../components/OrderHistory";

export default function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, loading } = useSelector((state) => state.auth);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  console.log(user, "user");
  const profileMethods = useForm({
    defaultValues: {
      name: user?.name || "",
      phone: user?.phone || "",
    },
  });

  const passwordMethods = useForm({
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const handleUpdateProfile = async (data) => {
    try {
      await dispatch(
        updateUserProfile({
          name: data.name,
          phone: data.phone,
        })
      ).unwrap();
      toast.success("Profile updated successfully!");
      setEditMode(false);
    } catch (error) {
      toast.error(error);
    }
  };

  const handleChangePassword = async (data) => {
    try {
      if (data.newPassword !== data.confirmPassword) {
        passwordMethods.setError("confirmPassword", {
          message: "Passwords do not match",
        });
        return;
      }

      await dispatch(
        changePassword({
          oldPassword: data.oldPassword,
          newPassword: data.newPassword,
        })
      ).unwrap();
      toast.success("Password changed successfully!");
      passwordMethods.reset();
    } catch (error) {
      toast.error(error);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      await dispatch(deleteUserAccount()).unwrap();
      toast.success("Account deleted successfully!");
      navigate("/");
    } catch (error) {
      toast.error(error);
    }
  };

  if (!user) {
    navigate("/login");
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Card shadow="sm" padding="lg" radius="md" className="mb-6">
        <div className="flex items-center gap-4 mb-6">
          <Avatar src={user?.avatar || ""} size={80} radius="xl" color="dark" />
          <div>
            <h1 className="text-2xl font-bold text-black">{user.name}</h1>
            <p className="text-dark">{user.email}</p>
          </div>
        </div>

        <Tabs defaultValue="profile" color="dark">
          <Tabs.List>
            <Tabs.Tab value="orders" leftSection={<FaBox size={14} />}>
              Orders History
            </Tabs.Tab>
            <Tabs.Tab value="profile" leftSection={<FaUser size={14} />}>
              Profile
            </Tabs.Tab>
            <Tabs.Tab value="password" leftSection={<FaLock size={14} />}>
              Change Password
            </Tabs.Tab>
            <Tabs.Tab value="danger" leftSection={<FaTrash size={14} />}>
              Delete
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="profile" pt="md">
            <FormProvider {...profileMethods}>
              <form
                onSubmit={profileMethods.handleSubmit(handleUpdateProfile)}
                className="space-y-4"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <TextInputField
                    name="name"
                    label="Name"
                    placeholder="Your name"
                    rules={{
                      required: "Name is required",
                      minLength: { value: 2, message: "At least 2 characters" },
                    }}
                    disabled={!editMode}
                  />
                  <TextInputField
                    name="phone"
                    label="Phone"
                    placeholder="+923001234567"
                    rules={{
                      pattern: {
                        value: /^\+?[1-9]\d{1,14}$/,
                        message: "Please enter a valid phone number",
                      },
                    }}
                    disabled={!editMode}
                  />
                </div>

                <Group justify="flex-end" mt="md">
                  {editMode ? (
                    <>
                      <Button
                        variant="outline"
                        onClick={() => {
                          setEditMode(false);
                          profileMethods.reset();
                        }}
                      >
                        Cancel
                      </Button>
                      <SubmitButton loading={loading}>
                        Save Changes
                      </SubmitButton>
                    </>
                  ) : (
                    <Button
                      leftSection={<FaEdit size={14} />}
                      onClick={() => setEditMode(true)}
                    >
                      Edit Profile
                    </Button>
                  )}
                </Group>
              </form>
            </FormProvider>
          </Tabs.Panel>

          <Tabs.Panel value="password" pt="md">
            <FormProvider {...passwordMethods}>
              <form
                onSubmit={passwordMethods.handleSubmit(handleChangePassword)}
                className="space-y-4 max-w-md"
              >
                <PasswordInputField
                  name="oldPassword"
                  label="Current Password"
                  placeholder="Enter current password"
                  rules={{ required: "Current password is required" }}
                />
                <PasswordInputField
                  name="newPassword"
                  label="New Password"
                  placeholder="Enter new password"
                  rules={{
                    required: "New password is required",
                    minLength: { value: 6, message: "At least 6 characters" },
                    pattern: {
                      value: /^[A-Za-z0-9]{6,}$/,
                      message: "Password can only contain letters and numbers",
                    },
                  }}
                />
                <PasswordInputField
                  name="confirmPassword"
                  label="Confirm New Password"
                  placeholder="Confirm new password"
                  rules={{
                    required: "Please confirm your password",
                    validate: (value, formValues) =>
                      value === formValues.newPassword ||
                      "Passwords do not match",
                  }}
                />
                <SubmitButton loading={loading}>Change Password</SubmitButton>
              </form>
            </FormProvider>
          </Tabs.Panel>

          <Tabs.Panel value="danger" pt="md">
            <Card withBorder className="border-red-200 bg-red-50">
              <Text fw={600} c="red" mb="sm">
                Delete Account
              </Text>
              <Text size="sm" mb="md">
                Once you delete your account, there is no going back. Please be
                certain.
              </Text>
              <Button
                color="black"
                leftSection={<FaTrash size={14} />}
                onClick={() => setDeleteModalOpen(true)}
              >
                Delete My Account
              </Button>
            </Card>
          </Tabs.Panel>
          <Tabs.Panel value="orders" pt="md">
            <OrdersHistory />
          </Tabs.Panel>
        </Tabs>
      </Card>

      {/* Delete Confirmation Modal */}
      <Modal
        opened={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        title="Delete Account"
        centered
        classNames={{
          title: "font-bold text-red-600",
        }}
      >
        <Text size="sm" mb="md">
          Are you sure you want to delete your account? This action cannot be
          undone and all your data will be permanently removed.
        </Text>
        <Group justify="flex-end">
          <Button variant="outline" onClick={() => setDeleteModalOpen(false)}>
            Cancel
          </Button>
          <Button color="dark" onClick={handleDeleteAccount} loading={loading}>
            Delete Account
          </Button>
        </Group>
      </Modal>
    </div>
  );
}
