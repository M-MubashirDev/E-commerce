import { Button, Divider, Group, Stack, Text } from "@mantine/core";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function CartOrderSummery({ formatPrice, cart }) {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  function handleProceedCheckOut() {
    if (!user) navigate("/login", { state: true });
    else navigate("/ordersummery");
  }

  return (
    <div className="lg:w-1/3 w-full">
      <div className="h-fit">
        <div
          style={{
            backgroundImage: "url('bg-Summery_2.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          className="bg-white border shadow-md rounded-lg z-10 relative border-gray-200"
        >
          <div className="p-6">
            <Text fw={700} size="xl" className="text-dark mb-6">
              Order Summary
            </Text>

            <Stack gap="md">
              <Group justify="space-between">
                <Text className="text-gray-600">
                  Subtotal ({cart.itemCount} items)
                </Text>
                <Text fw={600} className="text-dark">
                  {formatPrice(cart.total)}
                </Text>
              </Group>

              <Group justify="space-between">
                <Text className="text-gray-600">Shipping</Text>
                <Text fw={600} className="text-dark">
                  {cart.shipping === 0 ? "Free" : formatPrice(cart.shipping)}
                </Text>
              </Group>

              <Group justify="space-between">
                <Text className="text-gray-600">Tax</Text>
                <Text fw={600} className="text-dark">
                  {formatPrice(cart.tax)}
                </Text>
              </Group>

              <Divider />

              <Group justify="space-between">
                <Text fw={700} size="lg" className="text-dark">
                  Total
                </Text>
                <Text fw={800} size="xl" className="text-dark">
                  {formatPrice(cart.total + cart.shipping + cart.tax)}
                </Text>
              </Group>

              <Button className="!w-fit" onClick={handleProceedCheckOut}>
                Proceed to Checkout
              </Button>
            </Stack>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartOrderSummery;
