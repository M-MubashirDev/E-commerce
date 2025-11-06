import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import VerifyEmail from "./pages/VerifyEmail";
import ForgotPassword from "./pages/ForgotPassword";
import VerifyResetPassword from "./pages/VerifyResetPassword";
import ResetPassword from "./pages/ResetPassword";
import Profile from "./pages/Profile";
import Layout from "./components/Layout";
import About from "./pages/About";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
// import Product from "./pages/Product";
import OrderSummery from "./pages/OrderSummery";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="verify-email" element={<VerifyEmail />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route
            path="verify-reset-password"
            element={<VerifyResetPassword />}
          />
          <Route path="reset-password" element={<ResetPassword />} />
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="products" element={<Products />} />
            {/* <Route path="Product/:id" element={<Product />} /> */}
            <Route path="about" element={<About />} />
            <Route path="cart" element={<Cart />} />
            <Route path="ordersummery" element={<OrderSummery />} />
            <Route path="profile" element={<Profile />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
