import { useDispatch, useSelector } from "react-redux";
import { Button, Divider, Text, Title, Group, Card } from "@mantine/core";
import { useState } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { createOrder } from "../features/orders/orderThunks";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import LocationDetails from "../components/LocationDetail";

export default function OrderSummary() {
  const { location } = useSelector((state) => state.location);
  const { address, city, phone } = location;

  const [opened, setOpened] = useState(() => {
    return !address || !city || !phone;
  });
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cart } = useSelector((state) => state.cart);

  async function handleConfirmOrder() {
    if (!address || !city || !phone) {
      toast.error("Please add delivery details before proceeding");
      setOpened(true);
      return;
    }

    if (cart.items.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    setLoading(true);

    try {
      const orderObject = {
        address,
        city,
        phone,
        items: cart?.items.map((val) => ({
          productId: val.id,
          quantity: val.currentQuantity,
        })),
      };

      // Create order and get client_secret
      const response = await dispatch(createOrder(orderObject)).unwrap();

      if (response.result && response.result.client_secret) {
        // Navigate to separate payment page with order data
        navigate("/payment", {
          state: {
            clientSecret: response.result.client_secret,
            orderId: response.result.orderId,
          },
        });
      } else {
        toast.error("Failed to create order. Please try again.");
      }
    } catch (error) {
      console.error("Order creation error:", error);
      toast.error(error.message || "Failed to create order");
    } finally {
      setLoading(false);
    }
  }

  const formatPrice = (price) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);

  return (
    <section className="section-spacing bg-light-gray flex items-center justify-center min-h-screen">
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
          <Text size="sm" className="mt-2 sm:text-base">
            Please review your order before confirming
          </Text>
        </div>

        <div className="px-4 sm:px-6 md:px-8 py-6 space-y-4 sm:space-y-6">
          {cart.items.length === 0 ? (
            <div className="text-center py-12">
              <Text size="lg" mb="md">
                Your cart is empty
              </Text>
              <Button onClick={() => navigate("/products")}>
                Continue Shopping
              </Button>
            </div>
          ) : (
            cart.items.map((item) => {
              const discountedPrice =
                item.price - item.price * (item.discount / 100);
              const totalItemPrice = discountedPrice * item.currentQuantity;

              return (
                <div
                  key={item.id}
                  className="bg-light-gray/50 rounded-xl p-3 space-y-2 sm:p-4 transition-hover hover:bg-light-gray sm:flex sm:flex-row sm:items-center sm:gap-6"
                >
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={item.images?.[0] || "/batman.jpg"}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 space-y-1">
                    <Text
                      size="sm"
                      fw={600}
                      c="dark"
                      className="sm:text-base"
                      lineClamp={2}
                    >
                      {item.title}
                    </Text>
                    <Text size="xs" className="sm:text-sm">
                      Qty: {item.currentQuantity} ×{" "}
                      <span className="line-through text-gray-400 mr-1">
                        {item.discount > 0 ? formatPrice(item.price) : ""}
                      </span>
                      <span className="font-semibold text-dark">
                        {formatPrice(discountedPrice)}
                      </span>
                    </Text>
                    {item.discount > 0 && (
                      <Text size="xs" c="red" className="sm:text-xs">
                        Discount: {item.discount}%
                      </Text>
                    )}
                  </div>
                  <Text
                    size="sm"
                    fw={700}
                    c="dark"
                    className="sm:text-base text-right"
                  >
                    {formatPrice(totalItemPrice)}
                  </Text>
                </div>
              );
            })
          )}
        </div>

        {/* Location & Details */}
        <div className="px-4 sm:px-6 md:px-8 pb-6 sm:pb-8">
          <Divider my="md" />
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

                {address && city && phone ? (
                  <div className="space-y-1">
                    <Text size="sm" c="dark">
                      <strong>Address:</strong> {address}
                    </Text>
                    <Text size="sm" c="dark">
                      <strong>City:</strong> {city}
                    </Text>
                    <Text size="sm" c="dark">
                      <strong>Phone:</strong> {phone}
                    </Text>
                  </div>
                ) : (
                  <Text size="sm" c="red">
                    Please add delivery details to continue
                  </Text>
                )}
              </div>

              <Button
                size="xs"
                variant="light"
                radius="md"
                onClick={() => setOpened(true)}
              >
                {address ? "Change" : "Add"} Details
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
          <Divider my="md" />
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
            onClick={handleConfirmOrder}
            loading={loading}
            className="transition-hover hover:bg-dark-gray !w-full sm:!w-fit"
            disabled={cart.items.length === 0 || !address || !city || !phone}
            aria-label="Proceed to payment"
          >
            {loading ? "Creating Order..." : "Proceed to Payment"}
          </Button>
        </div>
      </div>

      <LocationDetails
        opened={opened}
        location={location}
        onClose={() => {
          // Only close if details are complete
          if (address && city && phone) {
            setOpened(false);
          } else {
            toast.error("Please complete all delivery details");
          }
        }}
      />
    </section>
  );
}
