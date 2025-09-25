import React, { useState } from "react";
import {
  Paper,
  Group,
  Text,
  Button,
  ActionIcon,
  Divider,
  Stack,
  Container,
  Grid,
  Badge,
  NumberInput,
  Checkbox,
  Image,
} from "@mantine/core";
import {
  FiMinus,
  FiPlus,
  FiTrash2,
  FiShoppingBag,
  FiChevronDown,
  FiChevronUp,
  FiTag,
} from "react-icons/fi";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Premium Wireless Headphones",
      description: "High-quality noise-canceling headphones",
      price: 199.99,
      originalPrice: 249.99,
      quantity: 2,
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=150&h=150&fit=crop",
      category: "Electronics",
      inStock: true,
      discount: 20,
    },
    {
      id: 1,
      name: "Premium Wireless Headphones",
      description: "High-quality noise-canceling headphones",
      price: 199.99,
      originalPrice: 249.99,
      quantity: 2,
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=150&h=150&fit=crop",
      category: "Electronics",
      inStock: true,
      discount: 20,
    },
    {
      id: 1,
      name: "Premium Wireless Headphones",
      description: "High-quality noise-canceling headphones",
      price: 199.99,
      originalPrice: 249.99,
      quantity: 2,
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=150&h=150&fit=crop",
      category: "Electronics",
      inStock: true,
      discount: 20,
    },
    {
      id: 2,
      name: "Organic Cotton T-Shirt",
      description: "Comfortable and sustainable cotton tee",
      price: 29.99,
      originalPrice: 34.99,
      quantity: 3,
      image:
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=150&h=150&fit=crop",
      category: "Clothing",
      inStock: true,
      discount: 15,
    },
    {
      id: 3,
      name: "Stainless Steel Water Bottle",
      description: "Insulated bottle keeps drinks cold for 24 hours",
      price: 39.99,
      originalPrice: null,
      quantity: 1,
      image:
        "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=150&h=150&fit=crop",
      category: "Lifestyle",
      inStock: true,
      discount: 0,
    },
  ]);

  const [promoCode, setPromoCode] = useState("");
  const [isPromoExpanded, setIsPromoExpanded] = useState(false);
  const [expandedItems, setExpandedItems] = useState({});

  // Cart calculations
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const totalDiscount = cartItems.reduce((sum, item) => {
    const itemDiscount = item.originalPrice
      ? (item.originalPrice - item.price) * item.quantity
      : 0;
    return sum + itemDiscount;
  }, 0);
  const shipping = subtotal > 100 ? 0 : 9.99;
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + shipping + tax;

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  const toggleItemDetails = (id) => {
    setExpandedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

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
      <div className="layout-spacing">
        <div>
          <div className="flex flex-col lg:flex-row gap-8 h-[90vh] py-12">
            {/* Cart Items - Left Side with Fixed Height and Scroll */}
            <div className=" flex-1 rounded-lg  lg:w-2/3">
              <div className="h-full">
                <div className="p-3 border border-medium-gray  rounded-[28px] ">
                  <div className="flex rounded-[12px] border-medium-gray shadow-sm bg-white p-4 justify-between gap-2">
                    <div>
                      <Text fw={700} size="xl" className="!text-dark">
                        Cart Items
                      </Text>
                      <Text size="sm" className="!text-dark-gray">
                        Review your selected products
                      </Text>
                    </div>
                    <Badge variant="filled" color="dark" size="lg" radius="md">
                      {cartItems.length} items
                    </Badge>
                  </div>
                </div>

                {/* Scrollable Cart Items */}
                <div className="h-[calc(100%-120px)] mt-4 p-3 border border-medium-gray   rounded-[28px] overflow-y-auto  bg-gray-light [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden space-y-4">
                  {cartItems.map((item, index) => (
                    <div key={item.id}>
                      <div className=" border border-medium-gray  rounded-[12px] shadow-lg bg-white   overflow-hidden">
                        <div className="flex items-center gap-4 p-4">
                          <div className="w-20 h-full rounded-xl overflow-hidden backdrop-blur-sm bg-white/20 border border-white/30">
                            <Image
                              src={item.image}
                              alt={item.name}
                              className="w-full h-full object-cover"
                              fallbackSrc="https://via.placeholder.com/80x80"
                            />
                          </div>

                          <div className="flex-1 min-w-0">
                            <Text
                              fw={600}
                              size="lg"
                              className="text-dark mb-1 leading-tight"
                            >
                              {item.name}
                            </Text>

                            <div className="flex items-center gap-3">
                              <div className="flex items-center backdrop-blur-sm bg-white/20 rounded-lg border border-white/30">
                                {item.quantity > 1 ? (
                                  <ActionIcon
                                    onClick={() =>
                                      updateQuantity(item.id, item.quantity - 1)
                                    }
                                    color="gray"
                                    variant="subtle"
                                    className="!border-0  transition-colors"
                                    size="md"
                                  >
                                    <FiMinus size={14} />
                                  </ActionIcon>
                                ) : (
                                  <ActionIcon
                                    onClick={() => removeItem(item.id)}
                                    color="gray"
                                    variant="subtle"
                                    className="!border-0  transition-colors"
                                    size="md"
                                  >
                                    <FiTrash2 size={14} />
                                  </ActionIcon>
                                )}
                                <div className="px-3 py-1 min-w-10 text-center">
                                  <Text fw={600} className="text-dark">
                                    {item.quantity}
                                  </Text>
                                </div>

                                <ActionIcon
                                  onClick={() =>
                                    updateQuantity(item.id, item.quantity + 1)
                                  }
                                  color="gray"
                                  variant="subtle"
                                  className="!border-0  transition-colors"
                                  size="sm"
                                >
                                  <FiPlus size={14} />
                                </ActionIcon>
                              </div>
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex flex-col items-center gap-2">
                            <Text fw={700} size="xl" className="!text-dark">
                              {formatPrice(item.price * item.quantity)}
                            </Text>
                            <Button
                              variant="filled"
                              size="xs"
                              radius="md"
                              color="dark"
                              onClick={() => toggleItemDetails(item.id)}
                            >
                              DETAILS {expandedItems[item.id] ? "▼" : "▲"}
                            </Button>
                          </div>
                        </div>

                        {/* Expandable Details */}
                        {expandedItems[item.id] && (
                          <div className="px-4 pb-4 ">
                            <div className="pt-3">
                              <Text
                                size="sm"
                                className="!text-darker-gray mb-2"
                              >
                                {item.description}
                              </Text>
                              {/* <div className="flex gap-2">
                                <Badge variant="outline" color="dark" size="sm">
                                  {item.category}
                                </Badge>
                                <Badge variant="outline" color="dark" size="sm">
                                  In Stock
                                </Badge>
                              </div> */}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Order Summary - Right Side */}
            <div className="lg:w-1/3 flex-shrink-0">
              <div className="sticky top-4 h-fit">
                <Paper
                  radius="lg"
                  shadow="md"
                  className="bg-white border border-gray-200"
                >
                  <div className="p-6">
                    <Text fw={700} size="xl" className="text-dark mb-6">
                      Order Summary
                    </Text>

                    <Stack gap="md">
                      {/* Subtotal */}
                      <Group justify="space-between">
                        <Text className="text-gray-600">
                          Subtotal ({cartItems.length} items)
                        </Text>
                        <Text fw={600} className="text-dark">
                          {formatPrice(subtotal)}
                        </Text>
                      </Group>

                      {/* Shipping */}
                      <Group justify="space-between">
                        <Text className="text-gray-600">Shipping</Text>
                        <Text fw={600} className="text-dark">
                          {shipping === 0 ? "Free" : formatPrice(shipping)}
                        </Text>
                      </Group>

                      {/* Tax */}
                      <Group justify="space-between">
                        <Text className="text-gray-600">Tax</Text>
                        <Text fw={600} className="text-dark">
                          {formatPrice(tax)}
                        </Text>
                      </Group>

                      <Divider />

                      {/* Total */}
                      <Group justify="space-between">
                        <Text fw={700} size="lg" className="text-dark">
                          Total
                        </Text>
                        <Text fw={800} size="xl" className="text-dark">
                          {formatPrice(total)}
                        </Text>
                      </Group>

                      {/* Checkout Button */}
                      <Button
                        size="lg"
                        radius="xl"
                        fullWidth
                        className="bg-dark hover:bg-gray-800 text-white font-semibold mt-4"
                      >
                        Proceed to Checkout
                      </Button>
                    </Stack>
                  </div>
                </Paper>
              </div>
            </div>
          </div>
        </div>
      </div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        id="visual"
        viewBox="0 0 960 540"
        width="960"
        height="540"
        version="1.1"
      >
        <rect x="0" y="0" width="960" height="540" fill="#f5f5f5" />
        <path
          d="M0 385L22.8 381.7C45.7 378.3 91.3 371.7 137 366.3C182.7 361 228.3 357 274 353C319.7 349 365.3 345 411.2 345.2C457 345.3 503 349.7 548.8 357.5C594.7 365.3 640.3 376.7 686 394.8C731.7 413 777.3 438 823 448.8C868.7 459.7 914.3 456.3 937.2 454.7L960 453L960 541L937.2 541C914.3 541 868.7 541 823 541C777.3 541 731.7 541 686 541C640.3 541 594.7 541 548.8 541C503 541 457 541 411.2 541C365.3 541 319.7 541 274 541C228.3 541 182.7 541 137 541C91.3 541 45.7 541 22.8 541L0 541Z"
          fill="#fff"
          stroke-linecap="round"
          stroke-linejoin="miter"
        />
      </svg>
    </div>
  );
};

export default CartPage;
