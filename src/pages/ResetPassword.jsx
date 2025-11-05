import { useForm, FormProvider } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AuthLayout from "../components/AuthLayout";
import { PasswordInputField, SubmitButton } from "../components/Form";
import { changeForgotPassword } from "../features/auth/authThunks";
import toast from "react-hot-toast";

export default function ResetPassword() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { loading } = useSelector((state) => state.auth);

  const otp = location.state?.otp || "";

  const methods = useForm({
    defaultValues: {
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
        changeForgotPassword({ otp, password: data.password })
      ).unwrap();

      toast.success("Password reset successfully!");
      navigate("/login");
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
            Reset Password
          </h1>
          <p className="text-center text-sm text-dark-secondary mb-4">
            Enter your new password below
          </p>
          <PasswordInputField
            name="password"
            label="New Password"
            placeholder="Enter new password"
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
            placeholder="Confirm new password"
            rules={{
              required: "Please confirm your password",
              validate: (value, formValues) =>
                value === formValues.password || "Passwords do not match",
            }}
          />
          <SubmitButton loading={loading} disabled={loading}>
            Reset Password
          </SubmitButton>
        </form>
      </FormProvider>
    </AuthLayout>
  );
}
