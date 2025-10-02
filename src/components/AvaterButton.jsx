import { Menu, Avatar, Button, Divider } from "@mantine/core";
import { FaChevronDown, FaSignOutAlt } from "react-icons/fa";

export default function AvatarButton({ user, onLogout, onLogin }) {
  // 🔹 If no user → just show a Sign In button
  if (!user) {
    return (
      <Button variant="filled" color="dark" radius="md" onClick={onLogin}>
        Sign In
      </Button>
    );
  }

  // 🔹 If user exists → show dropdown menu with Avatar + Logout
  return (
    <Menu
      transitionProps={{ transition: "pop" }}
      position="bottom-end"
      width={240}
      withinPortal
      classNames={{
        dropdown: "!bg-glass backdrop-blur-md shadow-lg !border-0",
        item: "hover:bg-dark-secondary text-dark",
      }}
    >
      <Menu.Target>
        <Button
          variant="filled"
          color="dark"
          className="flex items-center gap-2"
          rightSection={
            <div className="pl-2 ml-2 border-l border-gray-light flex items-center">
              <FaChevronDown size={14} />
            </div>
          }
        >
          <Avatar
            src={user?.avatar}
            alt={user?.name}
            variant="outline"
            color="white"
            radius="xl"
            size={24}
          />
        </Button>
      </Menu.Target>

      <Menu.Dropdown>
        {/* User Info */}
        <div className="p-3 flex items-center gap-3">
          <Avatar src={user?.avatar} radius="xl" size={48} color="white" />
          <div>
            <p className="text-sm font-semibold text-black">{user?.name}</p>
            <p className="text-xs text-dark">{user?.email}</p>
          </div>
        </div>

        <Divider className="border-gray-700" />

        {/* Logout */}
        <Menu.Item
          color="red"
          leftSection={<FaSignOutAlt size={14} />}
          onClick={onLogout}
        >
          Logout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
