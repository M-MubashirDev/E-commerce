import { useForm, FormProvider } from "react-hook-form";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import {
  PasswordInputField,
  SubmitButton,
  TextInputField,
} from "../components/Form";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../features/auth/authThunks";
import toast from "react-hot-toast";
import { loginUserAdmin } from "../features/adminAuth/authThunks";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const role = params.get("role");
  const { loading } = useSelector((state) => state.auth);
  const location = useLocation();
  const fromCheckout = location.state;
  const methods = useForm({
    defaultValues: { email: "", password: "", remember: false },
  });

  const onSubmit = async (data) => {
    try {
      await dispatch(
        loginUser({ email: data.email, password: data.password })
      ).unwrap();
      fromCheckout ? navigate("/cart") : navigate("/");
    } catch (error) {
      console.error("Login failed:", error);
      toast.error(error);
    }
  };
  const onSubmitAdmin = async (data) => {
    try {
      await dispatch(
        loginUserAdmin({ email: data.email, password: data.password })
      ).unwrap();
      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed:", error);
      toast.error(error);
    }
  };

  return (
    <AuthLayout>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(
            role === "admin" ? onSubmitAdmin : onSubmit
          )}
          className="space-y-2 w-full "
        >
          <h1 className="text-2xl font-bold text-center text-black">Login</h1>
          <TextInputField
            name="email"
            label="Email"
            placeholder="you@example.com"
            rules={{
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // simple email regex
                message: "Please enter a valid email address",
              },
            }}
          />

          <PasswordInputField
            name="password"
            label="Password"
            placeholder="Enter password"
            rules={{ required: "Password is required" }}
          />

          <div className="flex items-center justify-between text-sm">
            {!role && (
              <Link
                to="/forgot-password"
                className="text-dark hover:underline font-medium"
              >
                Forgot password?
              </Link>
            )}{" "}
          </div>

          <SubmitButton loading={loading}>Login</SubmitButton>
          <p className="text-center text-sm text-dark-secondary">
            Don’t have an account?
            <Link
              to={role ? `/signup?role=${role}` : "/signup"}
              state={fromCheckout}
              className="text-dark ml-1 font-medium hover:underline"
            >
              Sign up
            </Link>
          </p>
        </form>
      </FormProvider>
    </AuthLayout>
  );
}
