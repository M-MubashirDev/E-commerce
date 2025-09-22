import HeaderNav from "./Navbar";
import { Footer } from "./Footer";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="bg-dark">
      <HeaderNav />
      <Outlet />
      <Footer />
    </div>
  );
}
