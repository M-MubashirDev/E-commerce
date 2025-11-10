import { Button } from "@mantine/core";
import { useSelector } from "react-redux";
import { useForm, FormProvider } from "react-hook-form";
import { TextInputField } from "./Form";

const LocationDetails = ({ lat, lng, address, onSave }) => {
  const { location } = useSelector((state) => state.location);

  const methods = useForm({
    defaultValues: {
      address: address || location.address || "",
      city: location.city || "",
      phone: location.phone || "",
    },
  });

  const { watch, handleSubmit } = methods;

  const watchAddress = watch("address");
  const watchCity = watch("city");
  const watchPhone = watch("phone");

  const allFilled =
    watchAddress?.trim() && watchCity?.trim() && watchPhone?.trim();

  const handleFormSubmit = (data) => {
    const dataObject = { lat, lng, ...data };
    onSave(dataObject);
  };

  return (
    <div className="mt-4 space-y-2">
      <FormProvider {...methods}>
        <h1 className="font-bold text-gray-800">
          {address ? address : "Choose an address"}
        </h1>
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-3">
          <TextInputField
            name="address"
            placeholder="Address *"
            rules={{ required: "This field is required" }}
          />
          <TextInputField
            name="city"
            placeholder="City *"
            rules={{ required: "This field is required" }}
          />
          <TextInputField
            name="phone"
            placeholder="Phone *"
            rules={{ required: "This field is required" }}
          />

          <Button type="submit" disabled={!allFilled} fullWidth>
            Confirm Details
          </Button>
        </form>
      </FormProvider>
    </div>
  );
};

export default LocationDetails;
