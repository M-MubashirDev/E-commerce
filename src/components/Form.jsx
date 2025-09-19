import { useFormContext, FormProvider } from "react-hook-form";
import { TextInput, PasswordInput, Checkbox, Button } from "@mantine/core";

// Text Input Field with validation
export function TextInputField({ name, label, placeholder, rules = {} }) {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <TextInput
      label={label}
      placeholder={placeholder}
      radius="md"
      size="md"
      {...register(name, rules)}
      error={errors[name]?.message}
    />
  );
}

// Password Input Field with validation
export function PasswordInputField({ name, label, placeholder, rules = {} }) {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <PasswordInput
      label={label}
      placeholder={placeholder}
      radius="md"
      size="md"
      {...register(name, rules)}
      error={errors[name]?.message}
    />
  );
}

// Checkbox Field
export function CheckboxField({ name, label, rules = {} }) {
  const { register } = useFormContext();
  return <Checkbox label={label} {...register(name, rules)} />;
}

// Submit Button
export function SubmitButton({ children, loading }) {
  return (
    <Button
      type="submit"
      className="!bg-dark"
      fullWidth
      radius="md"
      loading={loading}
    >
      {children}
    </Button>
  );
}

// Export RHF FormProvider
export { FormProvider };
