import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Burger, Drawer, Group, Box, ScrollArea } from "@mantine/core";
import AvatarButton from "./AvaterButton";

export default function HeaderNav() {
  const { user } = useSelector((state) => state.auth);
  const [opened, setOpened] = useState(false);

  const navLinks = [
    { label: "Products", to: "/" },
    { label: "About", to: "/about" },
  ];

  return (
    <header className="bg-dark px-6 py-4 shadow-md sticky top-0 z-50">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div className="text-2xl font-bold text-white">NeoCart</div>

        {/* Desktop Navigation (hidden on < md) */}
        <div className="hidden md:flex">
          <Group spacing="lg">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="hover:underline text-gray-light font-medium"
              >
                {link.label}
              </Link>
            ))}
            <AvatarButton
              user={user}
              onLogout={() => console.log("Logging out...")}
            />
          </Group>
        </div>

        {/* Burger for mobile */}
        <Burger
          opened={opened}
          onClick={() => setOpened((o) => !o)}
          className="md:hidden"
          size="sm"
          color="white"
        />
      </div>

      {/* Drawer for mobile menu */}
      <Drawer
        opened={opened}
        onClose={() => setOpened(false)}
        padding="md"
        size="sm"
        classNames={{
          content: "!bg-glass !backdrop-blur-lg !border !border-gray-700", // glassy
          header: "!bg-transparent !border-0", // remove white header background
          close: "!text-gray-300 hover:!bg-dark-secondary rounded-md",
        }}
        overlayProps={{ backgroundOpacity: 0.4, blur: 6 }}
      >
        <ScrollArea style={{ height: "100%" }}>
          <Box className="flex flex-col gap-6 py-6">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-lg font-medium text-gray-light hover:underline"
                onClick={() => setOpened(false)}
              >
                {link.label}
              </Link>
            ))}
            <AvatarButton
              user={user}
              onLogout={() => {
                console.log("Logging out...");
                setOpened(false);
              }}
            />
          </Box>
        </ScrollArea>
      </Drawer>
    </header>
  );
}
