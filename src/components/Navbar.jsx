import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { Burger, Drawer, Box, ScrollArea } from "@mantine/core";
import AvatarButton from "./AvaterButton";
import { FaHome } from "react-icons/fa";
import { AiFillProduct } from "react-icons/ai";
import { FaCartShopping } from "react-icons/fa6";
import { FaInfoCircle } from "react-icons/fa";

export default function HeaderNav() {
  const { user } = useSelector((state) => state.auth);
  const [opened, setOpened] = useState(false);

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: <FaHome size={28} />, to: "/" },
    { label: <AiFillProduct size={28} />, to: "/products" },
    { label: <FaCartShopping size={28} />, to: "/cart" },
    { label: <FaInfoCircle size={28} />, to: "/about" },
  ];

  return (
    <header
      //
      className={`sticky top-0 h-fit   z-50 ${
        scrolled ? "bg-transparent" : "bg-light-gray"
      }`}
    >
      <div
        className={`${
          scrolled && "shadow-[0px_-1px_7px_4px_rgba(0,0,0,0.15)]"
        }   !bg-light-gray/60 container mx-auto px-4   backdrop-blur-lg py-6`}
      >
        <div className="flex   items-center justify-between">
          {/* Logo */}
          <div className="text-2xl font-bold text-main">NeoCart</div>

          {/* <div>
            <img src="logo.png" alt="logo" className="max-w-[40px]" />
          </div> */}
          {/* Desktop Navigation (hidden on < md) */}
          <div className="hidden md:flex">
            <div className="flex gap-8 items-center">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    `font-semibold ${
                      isActive
                        ? "!text-[#3c4046]" // active link
                        : "text-dark hover:underline"
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </div>
          </div>
          <div className="hidden md:flex">
            <AvatarButton
              user={user}
              onLogout={() => console.log("Logging out...")}
            />
          </div>
          {/* Burger for mobile */}
          <Burger
            opened={opened}
            onClick={() => setOpened((o) => !o)}
            className="md:hidden"
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
      </div>
    </header>
  );
}
