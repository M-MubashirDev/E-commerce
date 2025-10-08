import { useSelector } from "react-redux";
import { Button, Divider, Text, Title, Paper, Group } from "@mantine/core";
import LocationMapModal from "../components/MapModel";

export default function OrderSummary() {
  const { cart } = useSelector((state) => state.cart);

  const formatPrice = (price) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);

  return (
    <section className="section-spacing content-spacing bg-light-gray flex items-center justify-center min-h-screen">
      <Paper
        shadow="lg"
        radius="lg"
        className="w-full max-w-4xl bg-light transition-hover hover:shadow-xl"
        withBorder
      >
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

        {/* Items */}
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
            disabled={cart.items.length === 0}
            aria-label="Confirm your order"
          >
            Confirm Order
          </Button>
        </div>
      </Paper>
      <LocationMapModal />
    </section>
  );
}
