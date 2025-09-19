import { useForm, FormProvider } from "react-hook-form";
import AuthLayout from "../layouts/AuthLayout";
import { TextInputField, SubmitButton } from "../components/FormUI";

export default function ForgotPassword() {
  const methods = useForm({ defaultValues: { email: "" } });

  const onSubmit = (data) => console.log("Forgot password request:", data);

  return (
    <AuthLayout>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4">
          <h1 className="text-2xl font-bold text-center text-dark">
            Forgot Password
          </h1>
          <TextInputField
            name="email"
            label="Email"
            placeholder="you@example.com"
            rules={{ required: "Email is required" }}
          />
          <SubmitButton>Send Reset Link</SubmitButton>
        </form>
      </FormProvider>
    </AuthLayout>
  );
}
