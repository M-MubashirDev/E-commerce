import { Button } from "@mantine/core";
import { useSelector } from "react-redux";
import { useForm, FormProvider } from "react-hook-form";
import { TextInputField } from "./Form";

const LocationDetails = ({ lat, lng, address, onSave }) => {
  const { details } = useSelector((state) => state.location);
  const isShow = lat && lng && address;
  const methods = useForm({
    defaultValues: {
      houseNumber: details.houseNumber || "",
      streetDetails: details.streetDetails || "",
      landmark: details.landmark || "",
    },
  });
  const handleSubmit = (data) => {
    onSave(data, {
      lat,
      lng,
      address,
    });
  };

  return (
    <div className="mt-4 space-y-2">
      <FormProvider {...methods}>
        <h1 className="!font-bold">{isShow ? address : "chose an address"}</h1>
        <form
          onSubmit={methods.handleSubmit(handleSubmit)}
          className="space-y-3"
        >
          <TextInputField
            name="houseNumber"
            placeholder="House / Flat / Apartment / Office Number *"
            rules={{ required: "This field is required" }}
          />
          <TextInputField
            name="streetDetails"
            placeholder="Block / Sector / Street / Building / Floor Name or Number *"
            rules={{ required: "This field is required" }}
          />
          <TextInputField
            name="landmark"
            placeholder="Main Area / Town / Nearest Landmark *"
            rules={{ required: "This field is required" }}
          />

          <Button type="submit" disabled={!isShow}>
            Confirm Details
          </Button>
        </form>
      </FormProvider>
    </div>
  );
};

export default LocationDetails;
