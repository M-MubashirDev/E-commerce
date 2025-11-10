import { Outlet, useNavigate, useLocation } from "react-router-dom";
import {
  AppShell,
  Burger,
  Group,
  Text,
  ScrollArea,
  NavLink,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { FaHome, FaShoppingCart, FaBox, FaUsers, FaCog } from "react-icons/fa";
import { TbCategoryFilled } from "react-icons/tb";

export default function AdminLayout() {
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { label: "Dashboard", icon: FaHome, path: "/dashboard" },
    { label: "Orders", icon: FaShoppingCart, path: "/orders" },
    { label: "Categories", icon: TbCategoryFilled, path: "/categories" },
    { label: "Products", icon: FaBox, path: "/products" },
    { label: "Customers", icon: FaUsers, path: "/customers" },
    { label: "Settings", icon: FaCog, path: "/settings" },
  ];

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 260,
        breakpoint: "sm",
        collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
      }}
      padding="md"
    >
      {/* HEADER */}
      <AppShell.Header className="!bg-light-gray">
        <Group h="100%" px="md" justify="space-between">
          <Group>
            <img src="/mainLogo.png" alt="logo" className="w-34" />
          </Group>
          <Group>
            <Burger
              opened={mobileOpened}
              onClick={toggleMobile}
              hiddenFrom="sm"
              size="sm"
            />
            <Burger
              opened={desktopOpened}
              onClick={toggleDesktop}
              visibleFrom="sm"
              size="sm"
            />
          </Group>
        </Group>
      </AppShell.Header>

      {/* SIDEBAR */}
      <AppShell.Navbar p="md" className="!bg-light-gray">
        <AppShell.Section grow component={ScrollArea}>
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <NavLink
                key={item.path}
                label={item.label}
                leftSection={<Icon size={18} />}
                active={isActive}
                className={`!text-lg font-medium ${
                  isActive ? "!bg-dark !text-white !font-bold" : ""
                }`}
                onClick={() => {
                  navigate(item.path);
                  toggleMobile();
                }}
                style={{
                  borderRadius: 8,
                  marginBottom: 6,
                }}
              />
            );
          })}
        </AppShell.Section>

        <AppShell.Section>
          <Text size="xs" ta="center">
            © {new Date().getFullYear()} neoCart Admin
          </Text>
        </AppShell.Section>
      </AppShell.Navbar>

      {/* MAIN CONTENT */}
      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}
