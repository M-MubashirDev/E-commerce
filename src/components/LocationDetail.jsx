import { Button, Modal } from "@mantine/core";
import { useDispatch } from "react-redux";
import { useForm, FormProvider } from "react-hook-form";
import { TextInputField } from "./Form";
import { useGeolocation } from "../hooks/useGeolocation";
import { setLocation } from "../features/location/locationSlice";

const LocationDetails = ({ location, opened, onClose }) => {
  const dispatch = useDispatch();

  const { position } = useGeolocation();
  const { lat, lng } = position;
  console.log(position);

  const methods = useForm({
    defaultValues: {
      address: location.address || "",
      city: location.city || "",
      phone: location.phone || "",
    },
  });

  const { handleSubmit } = methods;

  const handleFormSubmit = (data) => {
    const dataObject = { lat, lng, ...data };
    dispatch(setLocation(dataObject));
    onClose();
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title="Select Your Location"
      size="xl"
      radius="lg"
      centered
      overlayProps={{ blur: 2 }}
      // closeOnClickOutside={false}
      // withCloseButton={false}
      // closeOnEscape={false}
    >
      <div className="mt-4 space-y-2">
        <FormProvider {...methods}>
          {/* <h1 className="font-bold text-gray-800">
          {address ? address : "Choose an address"}
        </h1> */}
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

            <Button type="submit">Confirm Details</Button>
          </form>
        </FormProvider>
      </div>
    </Modal>
  );
};

export default LocationDetails;
