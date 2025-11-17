import { useState } from "react";
import { useSelector } from "react-redux";

import SmallHero from "../components/SmallHero";
import CartModel from "../components/CartModel";
import EmptyCardCart from "../components/EmptyCardCart";
import CartItemSection from "../components/CartItemSection";
import CartOrderSummery from "../components/CartOrderSummery";

const Cart = () => {
  const [opened, setOpened] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedItem, setSelectedItem] = useState(null);

  const { cart } = useSelector((state) => state.cart);

  const cartItems = cart.items;

  const formatPrice = (price) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);

  if (cartItems.length === 0) {
    return <EmptyCardCart />;
  }

  return (
    <div className="min-h-screen bg-light-gray">
      <SmallHero />

      <div className="content-spacing">
        <div className="flex flex-col lg:flex-row gap-8 py-12">
          <CartItemSection
            cart={cart}
            setOpened={setOpened}
            cartItems={cartItems}
            formatPrice={formatPrice}
            setActiveIndex={setActiveIndex}
            setSelectedItem={setSelectedItem}
          />
          <CartOrderSummery formatPrice={formatPrice} cart={cart} />
        </div>
      </div>

      <CartModel
        opened={opened}
        selectedItem={selectedItem}
        activeIndex={activeIndex}
        setActiveIndex={setActiveIndex}
        setOpened={setOpened}
      />
    </div>
  );
};

export default Cart;
