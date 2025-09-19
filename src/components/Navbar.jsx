import { Menu, Button, Avatar } from "@mantine/core";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/auth/authSlice";
import { Link } from "react-router-dom";
import AvatarButton from "./AvaterButton";

export default function HeaderNav() {
  const { user } = useSelector((state) => state.auth);
  console.log(user);
  return (
    <header className="flex justify-between relative items-center bg-dark px-6 py-4 shadow-md ">
      {/* Logo */}
      <div className="text-2xl  font-bold text-white ">NeoCart</div>

      {/* Navigation */}
      <nav className="flex items-center gap-6">
        <Link
          href="/products"
          className="hover:underline text-gray-light  font-medium"
        >
          Products
        </Link>
        <Link
          href="/about"
          className="hover:underline text-gray-light font-medium"
        >
          About
        </Link>

        {/* Profile Dropdown */}
        <AvatarButton
          user={user}
          onLogout={() => console.log("Logging out...")}
        />
      </nav>
    </header>
  );
}
