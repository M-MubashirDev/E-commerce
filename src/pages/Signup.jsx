import { useForm, FormProvider } from "react-hook-form";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AuthLayout from "../components/AuthLayout";
import {
  TextInputField,
  PasswordInputField,
  SubmitButton,
} from "../components/Form";
import { signupUser } from "../features/auth/authThunks";
import toast from "react-hot-toast";
import { clearCart } from "../features/cart/cartSlice";
import { signupAdmin } from "../features/adminAuth/authThunks";

export default function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const role = params.get("role");
  const location = useLocation();
  const { loading } = useSelector((state) => state.auth);
  const fromCheckout = location.state;

  const methods = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      if (data.password !== data.confirmPassword) {
        methods.setError("confirmPassword", {
          message: "Passwords do not match",
        });
        return;
      }

      await dispatch(
        signupUser({
          name: data.name,
          email: data.email,
          password: data.password,
        })
      ).unwrap();

      dispatch(clearCart());
      toast.success("Account created! Please check your email to verify.");
      navigate("/verify-email", { state: { email: data.email, fromCheckout } });
    } catch (error) {
      toast.error(error);
    }
  };
  const onSubmitAdmin = async (data) => {
    console.log("admin");
    try {
      if (data.password !== data.confirmPassword) {
        methods.setError("confirmPassword", {
          message: "Passwords do not match",
        });
        return;
      }

      await dispatch(
        signupAdmin({
          name: data.name,
          email: data.email,
          password: data.password,
        })
      ).unwrap();

      toast.success("Account created!");
      navigate("/login?role=admin");
    } catch (error) {
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
          className="w-full space-y-2"
        >
          <h1 className="text-2xl font-bold text-center text-black mb-4">
            Sign Up
          </h1>
          <TextInputField
            name="name"
            label="Name"
            placeholder="John Doe"
            rules={{
              required: "Name is required",
              minLength: { value: 2, message: "At least 2 characters" },
            }}
          />
          <TextInputField
            name="email"
            label="Email"
            placeholder="you@example.com"
            rules={{
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Please enter a valid email address",
              },
            }}
          />
          <PasswordInputField
            name="password"
            label="Password"
            placeholder="Enter password"
            rules={{
              required: "Password is required",
              minLength: { value: 6, message: "At least 6 characters" },
              pattern: {
                value: /^[A-Za-z0-9]{6,}$/,
                message: "Password can only contain letters and numbers",
              },
            }}
          />
          <PasswordInputField
            name="confirmPassword"
            label="Confirm Password"
            placeholder="Confirm password"
            rules={{
              required: "Please confirm your password",
              validate: (value, formValues) =>
                value === formValues.password || "Passwords do not match",
            }}
          />
          <SubmitButton loading={loading} disabled={loading}>
            sign up
          </SubmitButton>
          <p className="text-center text-sm text-dark-secondary mt-3">
            Already have an account?{" "}
            <Link
              to={role ? `/login?role=${role}` : "/login"}
              state={fromCheckout}
              className="text-black font-medium hover:underline"
            >
              Log in
            </Link>
          </p>
        </form>
      </FormProvider>
    </AuthLayout>
  );
}
