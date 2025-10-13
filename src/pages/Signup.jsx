import { useForm, FormProvider } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AuthLayout from "../components/AuthLayout";
import {
  TextInputField,
  PasswordInputField,
  CheckboxField,
  FileInputField,
  SubmitButton,
} from "../components/Form";
import { signupUser, uploadFile } from "../features/auth/authThunks";
import toast from "react-hot-toast";

export default function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { loading } = useSelector((state) => state.auth);
  const fromCheckout = location.state;

  const methods = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      avatar: null,
      terms: false,
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

      // const emailCheck = await dispatch(
      //   checkEmailAvailability({ email: data.email })
      // ).unwrap();
      // console.log(emailCheck, "......");
      // if (!emailCheck.isAvailable) {
      //   methods.setError("email", { message: "Email already exists" });
      //   return;
      // }

      let avatarUrl = data.avatar;
      if (data.avatar instanceof File) {
        const uploadedFile = await dispatch(uploadFile(data.avatar)).unwrap();
        avatarUrl = uploadedFile.location;
      }

      await dispatch(
        signupUser({
          name: data.name,
          email: data.email,
          password: data.password,
          avatar: avatarUrl,
        })
      ).unwrap();

      toast.success("Account created successfully!");
      navigate(fromCheckout ? "/cart" : "/");
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
            Sign Up
          </h1>
          {/* {(methods.formState.errors.root || error) && (
            <p className="text-red-400 text-sm text-center mb-3">
              {methods.formState.errors.root?.message || error}
            </p>
          )} */}
          <TextInputField
            name="name"
            label="Name"
            placeholder="John Doe"
            rules={{
              required: "Name is required",
              minLength: { value: 2, message: "At least 2 characters" },
            }}
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
              pattern: {
                value: /^[A-Za-z0-9]{6,}$/,
                message: "Password can only contain letters and numbers",
              },
            }}
          />

          <PasswordInputField
            name="confirmPassword"
            label="Confirm Password"
            placeholder="Confirm password"
            rules={{
              required: "Please confirm your password",
              validate: (value, formValues) =>
                value === formValues.password || "Passwords do not match",
            }}
          />
          <FileInputField
            name="avatar"
            label="Avatar"
            placeholder="Upload an image"
            rules={{
              validate: (value) =>
                value === null ||
                value instanceof File ||
                "Please upload a valid image file",
            }}
          />
          <CheckboxField name="terms" label="remember me" />
          <SubmitButton loading={loading} disabled={loading}>
            sign up
          </SubmitButton>
          <p className="text-center text-sm text-dark-secondary mt-3">
            Already have an account?{" "}
            <Link
              to="/login"
              state={fromCheckout}
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
