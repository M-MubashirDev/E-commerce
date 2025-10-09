import { useDispatch, useSelector } from "react-redux";
import { Button, Divider, Text, Title, Group, Card } from "@mantine/core";
import LocationMapModal from "../components/MapModel";
import { setDetails, setLocation } from "../features/location/locationSlice";
import { useEffect, useState } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";

export default function OrderSummary() {
  const [opened, setOpened] = useState(false);
  const { cart } = useSelector((state) => state.cart);
  const { details, location } = useSelector((state) => state.location);
  const dispatch = useDispatch();

  // 🧠 Keep modal open if location/details are incomplete
  useEffect(() => {
    if (
      !location.address ||
      !details.houseNumber ||
      !details.streetDetails ||
      !details.landmark
    ) {
      setOpened(true);
    }
  }, [location, details]);

  // 🧭 Handle saving data from the modal
  function handleLocationSave(data, address) {
    const isValid =
      address &&
      data.houseNumber.trim() &&
      data.streetDetails.trim() &&
      data.landmark.trim();

    if (isValid) {
      dispatch(setDetails(data));
      dispatch(setLocation(address));
      setOpened(false);
    } else {
      alert("Please fill all fields and select a location before saving.");
    }
  }

  const formatPrice = (price) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);

  return (
    <section className="section-spacing  bg-light-gray flex items-center justify-center min-h-screen">
      <div className="w-full !max-w-4xl rounded-lg shadow-md bg-light content-spacing transition-hover hover:shadow-xl">
        {/* Page Title */}
        <div className="text-center pt-6 sm:pt-8 md:pt-10 px-4 sm:px-6 md:px-8">
          <Group justify="center" align="center" mb="sm">
            <Title
              order={2}
              className="!text-dark font-secondary tracking-tight text-xl sm:text-2xl md:text-3xl"
            >
              Order Summary
            </Title>
          </Group>
          <Text c="textGray" size="sm" className="mt-2 sm:text-base">
            Please review your order before confirming
          </Text>
        </div>

        {/* Cart Items */}
        <div className="px-4 sm:px-6 md:px-8 py-6 space-y-4 sm:space-y-6">
          {cart.items.length === 0 ? (
            <Text c="textGray" size="md" ta="center" my="lg">
              Your cart is empty
            </Text>
          ) : (
            cart.items.map((item) => (
              <div
                key={item.id}
                className="bg-light-gray/50 rounded-xl p-3 space-y-2 sm:p-4 transition-hover hover:bg-light-gray sm:flex sm:flex-row sm:items-center sm:gap-6"
              >
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden flex-shrink-0">
                  <img
                    src={item.images[0] || "https://via.placeholder.com/80"}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div spacing={4} className="flex-1">
                  <Text
                    size="sm"
                    fw={600}
                    c="dark"
                    className="sm:text-base"
                    lineClamp={2}
                  >
                    {item.title}
                  </Text>
                  <Text size="xs" c="textGray" className="sm:text-sm">
                    Qty: {item.currentQuantity} × {formatPrice(item.price)}
                  </Text>
                </div>
                <Text
                  size="sm"
                  fw={700}
                  c="dark"
                  className="sm:text-base text-right"
                >
                  {formatPrice(item.price * item.currentQuantity)}
                </Text>
              </div>
            ))
          )}
        </div>

        {/* Location & Details */}
        <div className="px-4 sm:px-6 md:px-8 pb-6 sm:pb-8">
          <Divider my="md" color="gray.0" />
          <Card
            withBorder
            radius="md"
            shadow="sm"
            className="bg-light-gray/40 p-4 sm:p-5"
          >
            <Group justify="space-between" align="flex-start">
              <div>
                <Group spacing="xs" align="center" mb={4}>
                  <FaMapMarkerAlt className="text-blue-600" size={18} />
                  <Text fw={600} size="sm" c="dark" className="sm:text-base">
                    Delivery Information
                  </Text>
                </Group>

                {location?.address ? (
                  <div className="space-y-1">
                    <Text size="sm" c="dark">
                      <strong>Address:</strong> {location.address}
                    </Text>
                    <Text size="sm" c="dark">
                      <strong>House No:</strong> {details.houseNumber}
                    </Text>
                    <Text size="sm" c="dark">
                      <strong>Street:</strong> {details.streetDetails}
                    </Text>
                    <Text size="sm" c="dark">
                      <strong>Landmark:</strong> {details.landmark}
                    </Text>
                    <Text size="xs" c="textGray">
                      Lat: {location.lat?.toFixed(4)} | Lng:{" "}
                      {location.lng?.toFixed(4)}
                    </Text>
                  </div>
                ) : (
                  <Text size="sm" c="textGray">
                    No delivery location or details added
                  </Text>
                )}
              </div>

              <Button
                size="xs"
                variant="light"
                radius="md"
                onClick={() => setOpened(true)}
              >
                {location?.address ? "Change" : "Add"} Details
              </Button>
            </Group>
          </Card>
        </div>

        {/* Totals */}
        <div className="px-4 sm:px-6 md:px-8 pb-6 sm:pb-8">
          <Divider my="md" color="gray.0" />
          <div className="space-y-2 sm:space-y-3">
            <Group justify="space-between">
              <Text fw={600} size="sm" c="dark" className="sm:text-base">
                Subtotal
              </Text>
              <Text size="sm" c="dark" className="sm:text-base">
                {formatPrice(cart.total)}
              </Text>
            </Group>
            <Group justify="space-between">
              <Text fw={600} size="sm" c="dark" className="sm:text-base">
                Shipping
              </Text>
              <Text size="sm" c="dark" className="sm:text-base">
                {cart.shipping === 0 ? "Free" : formatPrice(cart.shipping)}
              </Text>
            </Group>
            <Group justify="space-between">
              <Text fw={600} size="sm" c="dark" className="sm:text-base">
                Tax
              </Text>
              <Text size="sm" c="dark" className="sm:text-base">
                {formatPrice(cart.tax)}
              </Text>
            </Group>
          </div>
          <Divider my="md" color="gray.0" />
          <Group justify="space-between" className="mt-4">
            <Text fw={700} size="md" c="dark" className="sm:text-lg">
              Total
            </Text>
            <Text fw={700} size="md" c="dark" className="sm:text-lg">
              {formatPrice(cart.total + cart.shipping + cart.tax)}
            </Text>
          </Group>
        </div>

        {/* Confirm Button */}
        <div className="px-4 sm:px-6 md:px-8 pb-6 sm:pb-8">
          <Button
            size="md"
            radius="md"
            fullWidth
            className="transition-hover hover:bg-dark-gray sm:size-lg"
            disabled={
              cart.items.length === 0 ||
              !location.address ||
              !details.houseNumber ||
              !details.streetDetails ||
              !details.landmark
            }
            aria-label="Confirm your order"
          >
            Confirm Order
          </Button>
        </div>
      </div>

      {/* Location Modal */}
      <LocationMapModal opened={opened} onSave={handleLocationSave} />
    </section>
  );
}
