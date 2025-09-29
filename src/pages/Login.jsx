import { useForm, FormProvider } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import {
  PasswordInputField,
  SubmitButton,
  TextInputField,
} from "../components/Form";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../features/auth/authThunks";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.auth);

  const methods = useForm({
    defaultValues: { email: "", password: "", remember: false },
  });

  const onSubmit = async (data) => {
    try {
      await dispatch(
        loginUser({ email: data.email, password: data.password })
      ).unwrap();

      navigate("/");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <AuthLayout>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="space-y-4 w-full"
        >
          <h1 className="text-2xl font-bold text-center text-light">Login</h1>
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
            <Link
              to="/forgot-password"
              className="text-white hover:underline font-medium"
            >
              Forgot password?
            </Link>
          </div>

          <SubmitButton loading={loading}>Login</SubmitButton>
          <p className="text-center text-sm text-dark-secondary">
            Don’t have an account?
            <Link
              to="/signup"
              className="text-white font-medium hover:underline"
            >
              Sign up
            </Link>
          </p>
        </form>
      </FormProvider>
    </AuthLayout>
  );
}
