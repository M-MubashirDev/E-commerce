import { useFormContext, FormProvider } from "react-hook-form";
import {
  TextInput,
  PasswordInput,
  Checkbox,
  Button,
  FileInput,
} from "@mantine/core";
import { IoIosCloudUpload } from "react-icons/io";

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
      size="sm"
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
      size="sm"
      {...register(name, rules)}
      error={errors[name]?.message}
    />
  );
}

export function FileInputField({ name, label, placeholder, rules = {} }) {
  const {
    register,
    setValue,
    formState: { errors },
    setError,
    clearErrors,
  } = useFormContext();

  const handleFileChange = (file) => {
    if (!file) {
      setValue(name, null);
      clearErrors(name);
      return;
    }

    const validTypes = ["image/png", "image/jpeg", "image/jpg"];
    if (!validTypes.includes(file.type)) {
      setError(name, { message: "Only PNG, JPEG, or JPG files are allowed" });
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      setError(name, { message: "File size must be less than 2MB" });
      return;
    }

    setValue(name, file);
    clearErrors(name);
  };

  return (
    <>
      <FileInput
        leftSection={<IoIosCloudUpload />}
        label={label}
        placeholder={placeholder}
        radius="md"
        size="sm"
        accept="image/png,image/jpeg,image/jpg"
        onChange={handleFileChange}
        error={errors[name]?.message}
        clearable
      />
      <input type="hidden" {...register(name, rules)} />
    </>
  );
}

// Checkbox Field
export function CheckboxField({ name, label, rules = {} }) {
  const { register } = useFormContext();
  return <Checkbox color="dark" label={label} {...register(name, rules)} />;
}

// Submit Button
export function SubmitButton({ children, loading }) {
  return (
    <Button
      type="submit"
      fullWidth
      loaderProps={{ type: "bars" }}
      loading={loading}
    >
      {children}
    </Button>
  );
}

// Export RHF FormProvider
export { FormProvider };
