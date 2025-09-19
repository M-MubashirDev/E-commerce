import { useForm, FormProvider } from "react-hook-form";
import { Link } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import {
  CheckboxField,
  PasswordInputField,
  SubmitButton,
  TextInputField,
} from "../components/Form";

export default function Login() {
  const methods = useForm({
    defaultValues: { email: "", password: "", remember: false },
  });

  const onSubmit = (data) => console.log("Login data:", data);

  return (
    <AuthLayout>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="space-y-4 w-full"
        >
          <h1 className="text-2xl font-bold text-center text-dark">Login</h1>

          {/* Email */}
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

          {/* Password */}
          <PasswordInputField
            name="password"
            label="Password"
            placeholder="Enter password"
            rules={{ required: "Password is required" }}
          />

          {/* Remember + Forgot password */}
          <div className="flex items-center justify-between text-sm">
            {/* <CheckboxField name="remember" label="Remember me" /> */}
            <Link
              to="/forgot-password"
              className="text-white hover:underline font-medium"
            >
              Forgot password?
            </Link>
          </div>

          {/* Submit */}
          <SubmitButton>Login</SubmitButton>

          {/* Signup link */}
          <p className="text-center text-sm text-dark-secondary">
            Don’t have an account?{" "}
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
