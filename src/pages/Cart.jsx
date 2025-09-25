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
  Badge,
  Image,
} from "@mantine/core";
import { FiMinus, FiPlus, FiTrash2, FiShoppingBag } from "react-icons/fi";
import SmallHero from "../components/SmallHero";

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

  const [expandedItems, setExpandedItems] = useState({});

  // Cart calculations
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
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
      <SmallHero />

      <div className="layout-spacing px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8 py-12">
          {/* Cart Items */}
          <div className="flex-1 lg:w-2/3">
            <div className="p-3 border border-medium-gray rounded-[28px]">
              <div className="flex justify-between items-center rounded-[12px] border-medium-gray shadow-sm bg-white p-4">
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

            {/* Scroll only on large screens */}
            <div
              className="mt-4 p-3 border border-medium-gray rounded-[28px] bg-gray-light 
                            space-y-4 
                            lg:max-h-[70vh] lg:overflow-y-auto 
                            [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
            >
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="border border-medium-gray rounded-[12px] shadow-lg bg-white overflow-hidden"
                >
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4">
                    <div className="w-20 h-20 rounded-xl overflow-hidden bg-white/20 border border-white/30 flex-shrink-0">
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

                      <div className="flex items-center gap-3 mt-2">
                        <div className="flex items-center bg-white/20 rounded-lg border border-white/30">
                          {item.quantity > 1 ? (
                            <ActionIcon
                              onClick={() =>
                                updateQuantity(item.id, item.quantity - 1)
                              }
                              color="gray"
                              variant="subtle"
                              className="!border-0 transition-colors"
                              size="md"
                            >
                              <FiMinus size={14} />
                            </ActionIcon>
                          ) : (
                            <ActionIcon
                              onClick={() => removeItem(item.id)}
                              color="gray"
                              variant="subtle"
                              className="!border-0 transition-colors"
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
                            className="!border-0 transition-colors"
                            size="sm"
                          >
                            <FiPlus size={14} />
                          </ActionIcon>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col items-center gap-2 mt-2 sm:mt-0">
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
                    <div className="px-4 pb-4">
                      <div className="pt-3">
                        <Text size="sm" className="!text-darker-gray mb-2">
                          {item.description}
                        </Text>
                      </div>
                    </div>
                  )}
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
    </div>
  );
};

export default CartPage;
