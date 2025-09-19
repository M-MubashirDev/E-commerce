import { useForm, FormProvider } from "react-hook-form";
import { Link } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import {
  TextInputField,
  PasswordInputField,
  CheckboxField,
  SubmitButton,
} from "../components/Form";

export default function Signup() {
  const methods = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      // confirm: "",
      terms: false,
    },
  });

  const onSubmit = (data) => console.log("Signup data:", data);

  return (
    <AuthLayout>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="space-y-4 w-full"
        >
          <h1 className="text-2xl font-bold text-center text-dark">Sign Up</h1>

          <TextInputField
            name="name"
            label="Full Name"
            placeholder="John Doe"
            rules={{ required: "Name is required" }}
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
            }}
          />

          <CheckboxField
            name="terms"
            label="I accept the terms & conditions"
            rules={{ required: "You must accept the terms" }}
          />

          <SubmitButton>Sign Up</SubmitButton>

          <p className="text-center text-sm text-dark-secondary">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-white font-medium hover:underline"
            >
              Log in
            </Link>
          </p>
        </form>
      </FormProvider>
    </AuthLayout>
  );
}
