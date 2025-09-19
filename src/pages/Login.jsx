import { useForm, FormProvider } from "react-hook-form";

import AuthLayout from "../components/AuthLayout";
import {
  CheckboxField,
  PasswordInputField,
  SubmitButton,
  TextInputField,
} from "../components/Form";
import { Button } from "@mantine/core";

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
          <TextInputField
            name="email"
            label="Email"
            placeholder="you@example.com"
            rules={{ required: "Email is required" }}
          />
          <PasswordInputField
            name="password"
            label="Password"
            placeholder="Enter password"
            rules={{ required: "Password is required" }}
          />
          {/* <CheckboxField name="remember" label="Remember me" /> */}
          <SubmitButton>Login</SubmitButton>
        </form>
      </FormProvider>
    </AuthLayout>
  );
}
