import {
  Paper,
  Group,
  Text,
  Button,
  ActionIcon,
  Divider,
  Stack,
  Container,
  Badge,
  Image,
  Modal,
} from "@mantine/core";
import { FiMinus, FiPlus, FiTrash2, FiShoppingBag } from "react-icons/fi";
import SmallHero from "../components/SmallHero";
import { useDispatch, useSelector } from "react-redux";
import { setCartItem, setReduceItem } from "../features/cart/cartSlice";
import { useState } from "react";

const Cart = () => {
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cart);
  const cartItems = cart.items;

  const [opened, setOpened] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const updateQuantity = (item, type) => {
    if (type === "increase") {
      dispatch(setCartItem({ ...item }));
    } else {
      dispatch(setReduceItem({ ...item }));
    }
    // Later you can add decrease/remove actions
  };

  const formatPrice = (price) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-light-gray">
        <Container size="xl" className="px-4 sm:px-6 lg:px-8 py-12">
          <Paper
            className="p-12 text-center backdrop-blur-lg border border-medium-gray/30"
            style={{
              background: "rgba(255, 255, 255, 0.95)",
              backdropFilter: "blur(20px)",
            }}
            radius="xl"
            shadow="lg"
          >
            <div className="max-w-md mx-auto">
              <FiShoppingBag size={64} className="text-gray-400 mx-auto mb-4" />
              <Text size="xl" fw={600} className="text-dark mb-2">
                Your cart is empty
              </Text>
              <Text className="text-gray-600 mb-6">
                Add some products to get started with your shopping
              </Text>
              <Button
                size="lg"
                radius="xl"
                className="bg-dark hover:bg-gray-800 text-white"
              >
                Continue Shopping
              </Button>
            </div>
          </Paper>
        </Container>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-light-gray">
      <SmallHero />

      <div className="content-spacing">
        <div className="flex flex-col lg:flex-row gap-8 py-12">
          {/* Cart Items Section */}
          <div className="flex-1 lg:w-2/3">
            <div className="p-3 border border-medium-gray rounded-[28px]">
              <div className="flex sm:flex-row flex-col gap-2 justify-between items-center rounded-[12px] border-medium-gray shadow-sm bg-white p-4">
                <div>
                  <Text fw={700} size="xl" className="!text-dark">
                    Cart Items
                  </Text>
                  <Text size="sm" className="!text-dark-gray">
                    Review your selected products
                  </Text>
                </div>
                <Badge variant="filled" color="dark" size="lg" radius="md">
                  {cart.itemCount} items
                </Badge>
              </div>
            </div>

            {/* Items */}
            <div className="mt-4 p-3 border border-medium-gray rounded-[28px] bg-gray-light space-y-4 lg:max-h-[70vh] lg:overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="border border-medium-gray rounded-[12px] shadow-lg bg-white overflow-hidden"
                >
                  <div className="flex flex-col sm:flex-row  items-center gap-4 p-4">
                    {/* Image */}
                    <div className="w-20 h-20 rounded-xl overflow-hidden bg-white/20 border border-white/30 flex-shrink-0">
                      <Image
                        src={item.images[0]}
                        alt={item.title}
                        className="w-full h-full object-cover"
                        fallbackSrc="https://via.placeholder.com/80x80"
                      />
                    </div>

                    {/* Title + Detail */}
                    <div className="flex-1 min-w-0">
                      <Text fw={600} size="lg" className="text-dark mb-1">
                        {item.title}
                      </Text>

                      {/* Quantity controls */}
                      <div className="flex items-center gap-3 mt-2">
                        <div className="flex items-center bg-white/20 rounded-lg border border-white/30">
                          {item.currentQuantity > 1 ? (
                            <ActionIcon
                              onClick={() => updateQuantity(item, "decrease")}
                              color="dark"
                              variant="subtle"
                              size="md"
                            >
                              <FiMinus size={14} />
                            </ActionIcon>
                          ) : (
                            <ActionIcon
                              onClick={() => updateQuantity(item, "remove")}
                              color="dark"
                              variant="subtle"
                              size="md"
                            >
                              <FiTrash2 size={14} />
                            </ActionIcon>
                          )}
                          <div className="px-3 py-1 min-w-10 text-center">
                            <Text fw={600} className="text-dark">
                              {item.currentQuantity}
                            </Text>
                          </div>
                          <ActionIcon
                            onClick={() => updateQuantity(item, "increase")}
                            color="dark"
                            variant="subtle"
                            size="sm"
                          >
                            <FiPlus size={14} />
                          </ActionIcon>
                        </div>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="flex flex-col items-center gap-2 mt-2 sm:mt-0">
                      <Text fw={700} size="xl" className="!text-dark">
                        {formatPrice(item.price * item.currentQuantity)}
                      </Text>
                      {/* Detail Button */}
                      <Button
                        size="xs"
                        variant="light"
                        color="dark"
                        radius="md"
                        onClick={() => {
                          setSelectedItem(item);
                          setOpened(true);
                        }}
                      >
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
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
                        {cart.shipping === 0
                          ? "Free"
                          : formatPrice(cart.shipping)}
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

                    <Button
                      size="lg"
                      radius="xl"
                      fullWidth
                      color="dark"
                      className="bg-dark hover:bg-gray-800 text-white font-semibold mt-4"
                    >
                      Proceed to Checkout
                    </Button>
                  </Stack>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Details Modal */}
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title={selectedItem?.title}
        centered
      >
        {selectedItem && (
          <div>
            <Image
              src={selectedItem.images[0]}
              alt={selectedItem.title}
              radius="md"
              mb="md"
            />
            <Text size="sm" className="text-dark-gray">
              {selectedItem.description}
            </Text>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Cart;
