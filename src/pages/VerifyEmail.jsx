import { useForm, FormProvider } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AuthLayout from "../components/AuthLayout";
import { TextInputField, SubmitButton } from "../components/Form";
import { verifyOTP, resendEmail } from "../features/auth/authThunks";
import toast from "react-hot-toast";
import { useState } from "react";

export default function VerifyEmail() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { loading } = useSelector((state) => state.auth);
  const [resending, setResending] = useState(false);

  const email = location.state?.email || "";
  const fromCheckout = location.state?.fromCheckout;

  const methods = useForm({
    defaultValues: { otp: "" },
  });

  const onSubmit = async (data) => {
    try {
      await dispatch(verifyOTP({ email, otp: data.otp })).unwrap();
      toast.success("Email verified successfully!");
      navigate(fromCheckout ? "/cart" : "/");
    } catch (error) {
      toast.error(error);
    }
  };

  const handleResendEmail = async () => {
    try {
      setResending(true);
      await dispatch(resendEmail(email)).unwrap();
      toast.success("Verification email sent!");
    } catch (error) {
      toast.error(error);
    } finally {
      setResending(false);
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
            Verify Email
          </h1>
          <p className="text-center text-sm text-dark-secondary mb-4">
            We ve sent a verification code to <strong>{email}</strong>
          </p>
          <TextInputField
            name="otp"
            label="Verification Code"
            placeholder="Enter 6-digit code"
            rules={{
              required: "Verification code is required",
              pattern: {
                value: /^\d{6}$/,
                message: "Code must be 6 digits",
              },
            }}
          />
          <SubmitButton loading={loading} disabled={loading}>
            Verify Email
          </SubmitButton>
          <div className="text-center">
            <button
              type="button"
              onClick={handleResendEmail}
              disabled={resending}
              className="text-sm text-black font-medium hover:underline disabled:opacity-50"
            >
              {resending ? "Sending..." : "Resend Code"}
            </button>
          </div>
        </form>
      </FormProvider>
    </AuthLayout>
  );
}
