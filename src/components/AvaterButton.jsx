import { Menu, Avatar, Button, Divider } from "@mantine/core";
import { FaChevronDown, FaSignOutAlt } from "react-icons/fa";

export default function AvatarButton({ user, onLogout }) {
  return (
    <Menu
      transitionProps={{ transition: "pop" }}
      position="bottom-end"
      width={240}
      withinPortal
      classNames={{
        dropdown: "!bg-glass backdrop-blur-md shadow-lg border-0", // removed border
        item: "hover:bg-dark-secondary text-gray-light",
      }}
    >
      <Menu.Target>
        <Button
          variant="outline"
          color="gray"
          radius="md"
          className="flex items-center gap-2"
          rightSection={
            <div className="pl-2 ml-2 border-l border-gray-light flex items-center">
              <FaChevronDown size={14} />
            </div>
          }
        >
          <Avatar src={user?.avatar} alt={user?.name} radius="xl" size={24} />
        </Button>
      </Menu.Target>

      <Menu.Dropdown>
        {/* User Info */}
        <div className="p-3 flex items-center gap-3">
          <Avatar src={user?.avatar} radius="xl" size={48} />
          <div>
            <p className="text-sm font-semibold text-white">{user?.name}</p>
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
