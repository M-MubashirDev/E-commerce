import { useState } from "react";
import { Button } from "@mantine/core";

function Checkout() {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      title: "Krunch Burger + Drink",
      price: 820,
      quantity: 2,
      image:
        "https://www.kfcpakistan.com/images/ff8cf582-7080-11ef-9d9f-f12cf9fb8619-krunch-burger-drink.jpg",
      extras: ["Pepsi Regular"],
    },
    {
      id: 2,
      title: "Zinger Stacker",
      price: 950,
      quantity: 1,
      image:
        "https://www.kfcpakistan.com/images/6f3d88c2-7081-11ef-9d9f-f12cf9fb8619-zinger-stacker.jpg",
      extras: ["Fries", "Pepsi"],
    },
  ]);

  const increaseQty = (id) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQty = (id) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="container mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Left side - Product List */}
      <div className="lg:col-span-2 space-y-4">
        <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between bg-white rounded-xl shadow-md p-4"
          >
            {/* Image */}
            <img
              src={item.image}
              alt={item.title}
              className="w-24 h-24 object-cover rounded-lg"
            />

            {/* Info */}
            <div className="flex-1 px-4">
              <h3 className="font-semibold text-lg">{item.title}</h3>
              <div className="text-sm text-gray-600">
                {item.extras.map((extra, i) => (
                  <p key={i}>• {extra}</p>
                ))}
              </div>
            </div>

            {/* Quantity controls */}
            <div className="flex items-center gap-2">
              <Button
                onClick={() => decreaseQty(item.id)}
                variant="outline"
                color="dark"
                size="xs"
              >
                -
              </Button>
              <span className="font-bold">{item.quantity}</span>
              <Button
                onClick={() => increaseQty(item.id)}
                variant="outline"
                color="dark"
                size="xs"
              >
                +
              </Button>
            </div>

            {/* Price */}
            <div className="ml-4 text-right">
              <p className="text-lg font-bold">
                Rs {item.price * item.quantity}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Right side - Order Summary */}
      <div className="bg-white rounded-xl shadow-md p-6 h-fit">
        <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
        <div className="space-y-2">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex justify-between text-sm text-gray-700"
            >
              <span>
                {item.title} x {item.quantity}
              </span>
              <span>Rs {item.price * item.quantity}</span>
            </div>
          ))}
        </div>

        <hr className="my-4" />

        <div className="flex justify-between font-bold text-lg">
          <span>Total</span>
          <span>Rs {total}</span>
        </div>

        <Button
          fullWidth
          radius="md"
          color="dark"
          className="mt-4 !text-white font-semibold"
        >
          Proceed to Checkout
        </Button>
      </div>
    </div>
  );
}

export default Checkout;
