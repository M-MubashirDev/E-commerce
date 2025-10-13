import {
  Paper,
  Group,
  Text,
  Button,
  Divider,
  Stack,
  Container,
  Badge,
  Image,
  Modal,
} from "@mantine/core";
import { FiShoppingBag } from "react-icons/fi";
import SmallHero from "../components/SmallHero";
import { useSelector } from "react-redux";
import { useState } from "react";
import ItemQuantityButton from "../components/ItemQuantityButton";
import { ProductDetailCarousel } from "../ui/ProductDetailCarasoul";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedItem, setSelectedItem] = useState(null);
  const [opened, setOpened] = useState(false);

  const navigate = useNavigate();

  const { cart } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  const cartItems = cart.items;

  const formatPrice = (price) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  // console.log(accessToken, refreshToken);
  function handleProceedCheckOut() {
    if (!user) navigate("/login", { state: true });
    else navigate("/ordersummery");
  }

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
            <div className="p-3 sm:border sm:border-medium-gray rounded-[28px]">
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
            <div className="mt-4 p-3 sm:border sm:border-medium-gray rounded-[28px] bg-gray-light space-y-4 lg:max-h-[70vh] lg:overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
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
                      <div className="flex items-center justify-center sm:justify-start gap-3 mt-2 ">
                        <ItemQuantityButton item={item} />
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
                          setActiveIndex(0); // reset carousel to first image
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

                    <Button onClick={handleProceedCheckOut}>
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
        size="lg"
      >
        {selectedItem && (
          <div className="flex flex-col items-center gap-4">
            {/* Carousel */}
            <ProductDetailCarousel
              images={selectedItem.images}
              activeIndex={activeIndex}
              setActiveIndex={setActiveIndex}
            />

            {/* Thumbnails */}
            <div className="flex gap-3 justify-center items-center h-[70px] mt-2">
              {selectedItem.images?.map((image, ind) => (
                <img
                  key={ind}
                  src={image}
                  alt={`thumb-${ind}`}
                  className={`h-full rounded-md w-auto object-contain cursor-pointer transition ${
                    activeIndex === ind
                      ? "ring-2 ring-primary scale-105"
                      : "opacity-70 hover:opacity-100"
                  }`}
                  onClick={() => setActiveIndex(ind)}
                />
              ))}
            </div>

            {/* Description */}
            <Text size="sm" className="text-dark-gray mt-4">
              {selectedItem.description}
            </Text>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Cart;
