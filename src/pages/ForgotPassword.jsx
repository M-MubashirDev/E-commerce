import { useForm, FormProvider } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AuthLayout from "../components/AuthLayout";
import { TextInputField, SubmitButton } from "../components/Form";
import { forgotPassword } from "../features/auth/authThunks";
import toast from "react-hot-toast";

export default function ForgotPassword() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.auth);

  const methods = useForm({
    defaultValues: { email: "" },
  });

  const onSubmit = async (data) => {
    try {
      await dispatch(forgotPassword(data.email)).unwrap();
      toast.success("Reset code sent to your email!");
      navigate("/verify-reset-password", { state: { email: data.email } });
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <AuthLayout>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="w-full space-y-2"
        >
          <h1 className="text-2xl font-bold text-center text-black mb-4">
            Forgot Password
          </h1>
          <p className="text-center text-sm text-dark-secondary mb-4">
            Enter your email address and we ll send you a code to reset your
            password.
          </p>
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
          <SubmitButton loading={loading} disabled={loading}>
            Send Reset Code
          </SubmitButton>
          <p className="text-center text-sm text-dark-secondary mt-3">
            Remember your password?{" "}
            <Link
              to="/login"
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
