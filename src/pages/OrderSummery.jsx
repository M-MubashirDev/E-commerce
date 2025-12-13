import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Divider,
  Text,
  Title,
  Group,
  Card,
  Modal,
} from "@mantine/core";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import LocationMapModal from "../components/MapModel";
import { useEffect, useState } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { setLocation } from "../features/location/locationSlice";
import { createOrder } from "../features/orders/orderThunks";
import PaymentForm from "../components/PaymentForm";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../features/cart/cartSlice";

// Load Stripe outside component to avoid recreating on every render
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

export default function OrderSummary() {
  const [opened, setOpened] = useState(false);
  const [paymentModalOpened, setPaymentModalOpened] = useState(false);
  const [orderData, setOrderData] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cart } = useSelector((state) => state.cart);
  const { location } = useSelector((state) => state.location);
  const { address, city, phone } = location;

  useEffect(() => {
    if (!address || !city || !phone) {
      setOpened(true);
    }
  }, [address, city, phone]);

  function handleLocationSave(data) {
    console.log(data);
    dispatch(setLocation(data));
    setOpened(false);
  }

  async function handleConfirmOrder() {
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
        setOrderData({
          clientSecret: response.result.client_secret,
          orderId: response.result.orderId,
          amount: response.result.amount,
        });
        setPaymentModalOpened(true);
      } else {
        toast.error("Failed to create order");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Failed to create order");
    }
  }

  function handlePaymentSuccess() {
    setPaymentModalOpened(false);
    toast.success("Order placed and payment confirmed!");
    dispatch(clearCart());
    navigate("/");
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

        {/* Cart Items */}
        {/* Cart Items */}
        <div className="px-4 sm:px-6 md:px-8 py-6 space-y-4 sm:space-y-6">
          {cart.items.length === 0 ? (
            <Text size="md" ta="center" my="lg">
              Your cart is empty
            </Text>
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
                      src={"/batman.jpg"}
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
                      <strong>City Name:</strong> {city}
                    </Text>
                    <Text size="sm" c="dark">
                      <strong>Phone:</strong> {phone}
                    </Text>
                    <Text size="xs">
                      Lat: {location.lat?.toFixed(4)} | Lng:{" "}
                      {location.lng?.toFixed(4)}
                    </Text>
                  </div>
                ) : (
                  <Text size="sm">No delivery location or details added</Text>
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
            fullWidth
            className="transition-hover hover:bg-dark-gray sm:size-lg"
            disabled={cart.items.length === 0 || !address || !city || !phone}
            aria-label="Proceed to payment"
          >
            Proceed to Payment
          </Button>
        </div>
      </div>

      {/* Location Modal */}
      <LocationMapModal opened={opened} onSave={handleLocationSave} />

      {/* Payment Modal - Wrapped with Elements provider */}
      <Modal
        opened={paymentModalOpened}
        onClose={() => setPaymentModalOpened(false)}
        title="Complete Payment"
        size="md"
        centered
      >
        {orderData && (
          <Elements stripe={stripePromise}>
            <div>
              <PaymentForm
                clientSecret={orderData.clientSecret}
                orderId={orderData.orderId}
                onSuccess={handlePaymentSuccess}
              />
            </div>
          </Elements>
        )}
      </Modal>
    </section>
  );
}
