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
import Product from "./pages/Product";
import AdminLayout from "./components/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import Categories from "./pages/admin/Categories";
import CategoriesAction from "./pages/admin/CategoriesAction";
import AdminProducts from "./pages/admin/Products";
import Customer from "./pages/admin/Customer";
import Orders from "./pages/admin/Orders";
import Settings from "./pages/admin/Settings";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { lazy, Suspense } from "react";
import { Spinner } from "./ui/Spinners";
import PaymentSuccess from "./pages/Success";
import PaymentFailure from "./pages/Failure";
const OrderSummery = lazy(() => import("./pages/OrderSummery"));
const Payment = lazy(() => import("./pages/Payment"));

function App() {
  return (
    <>
      <Suspense fallback={<Spinner />}>
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
              <Route path="Product/:id" element={<Product />} />
              <Route path="about" element={<About />} />
              <Route path="cart" element={<Cart />} />
              <Route path="ordersummery" element={<OrderSummery />} />
              <Route path="payment" element={<Payment />} />
              <Route path="paymentSuccess" element={<PaymentSuccess />} />
              <Route path="failure" element={<PaymentFailure />} />
              <Route path="profile" element={<Profile />} />
            </Route>

            {/* admin */}
            <Route
              element={
                <ProtectedRoute>
                  <AdminLayout />
                </ProtectedRoute>
              }
            >
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="categories">
                <Route index element={<Categories />} />
                <Route path=":id/edit" element={<CategoriesAction />} />
                <Route path="add" element={<CategoriesAction />} />
              </Route>
              <Route path="adminProducts" element={<AdminProducts />} />
              <Route path="customers" element={<Customer />} />
              <Route path="Orders" element={<Orders />} />
              <Route path="settings" element={<Settings />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Suspense>
    </>
  );
}

export default App;
