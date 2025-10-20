import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Burger, Drawer, Box, ScrollArea } from "@mantine/core";
import AvatarButton from "./AvaterButton";
import { FaHome } from "react-icons/fa";
import { AiFillProduct } from "react-icons/ai";
import { FaCartShopping } from "react-icons/fa6";
import { FaInfoCircle } from "react-icons/fa";
import { logout } from "../features/auth/authSlice";

export default function HeaderNav() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart);
  const [opened, setOpened] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Navigation links with icon and name
  const navLinks = [
    { label: <FaHome size={28} />, name: "Home", to: "/" },
    { label: <AiFillProduct size={28} />, name: "Products", to: "/products" },
    {
      label: <FaCartShopping size={28} />,
      name: "Cart",
      to: "/cart",
      showCart: true,
    }, // ✅ mark cart
    { label: <FaInfoCircle size={28} />, name: "neoCart", to: "/about" },
  ];

  return (
    <header
      className={`sticky h-fit px-3 z-50 ${
        scrolled ? "bg-transparent top-3" : "bg-light top-0"
      }`}
    >
      <div
        className={`${
          scrolled && "shadow-[0px_-1px_7px_4px_rgba(0,0,0,0.15)] bg-white/60"
        } container mx-auto px-4 rounded-lg backdrop-blur-lg py-6`}
      >
        <div className="flex items-center justify-between">
          {/* Logo */}
          <img src="/mainLogo.png" className="w-40" alt="neo cart" />

          {/* Desktop Navigation (hidden on < lg) */}
          <div className="hidden lg:flex">
            <div className="flex gap-1 items-center">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    `font-semibold flex items-center p-2 gap-2 relative ${
                      isActive
                        ? "!text-[#3c4046] shadow-lg border-medium-gray/90 border-[0.3px] rounded-md"
                        : "text-dark hover:underline"
                    }`
                  }
                >
                  {/* Show badge on cart */}
                  <div className="relative">
                    {link.label}
                    {link.showCart && cart.itemCount > 0 && (
                      <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full shadow-md">
                        {cart.itemCount}
                      </span>
                    )}
                  </div>
                  <span>{link.name}</span>
                </NavLink>
              ))}
            </div>
          </div>

          <div className="hidden lg:flex">
            <AvatarButton
              user={user}
              onLogin={() => {
                navigate("/login");
              }}
              onLogout={() => dispatch(logout())}
            />
          </div>

          {/* Burger for mobile (visible on < lg) */}
          <Burger
            opened={opened}
            onClick={() => setOpened((o) => !o)}
            className="lg:hidden"
            size="sm"
            color="Black"
          />
        </div>

        {/* Drawer for mobile menu */}
        <Drawer
          opened={opened}
          onClose={() => setOpened(false)}
          padding="md"
          size="sm"
          classNames={{
            content: "!bg-glass !backdrop-blur-lg",
            header: "!bg-transparent !border-0",
            close: "hover:!bg-dark-secondary rounded-md",
          }}
          overlayProps={{ backgroundOpacity: 0.4, blur: 6 }}
        >
          <ScrollArea style={{ height: "100%" }}>
            <Box className="flex flex-col h-full">
              {/* Logo at top left */}
              <div className="p-4">
                <img src="/mainLogo.png" alt="logo" className="w-34" />
              </div>

              {/* Navigation links and avatar button */}
              <Box className="flex flex-col gap-6 py-6 px-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className="text-lg font-medium text-gray-light hover:underline flex items-center gap-3 relative"
                    onClick={() => setOpened(false)}
                  >
                    <div className="relative">
                      {link.label}
                      {link.showCart && cart.itemCount > 0 && (
                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full shadow-md">
                          {cart.itemCount}
                        </span>
                      )}
                    </div>
                    <span>{link.name}</span>
                  </Link>
                ))}
                <AvatarButton
                  user={user}
                  onLogin={() => {
                    navigate("/login");
                  }}
                  onLogout={() => {
                    setOpened(false);
                  }}
                />
              </Box>
            </Box>
          </ScrollArea>
        </Drawer>
      </div>
    </header>
  );
}
