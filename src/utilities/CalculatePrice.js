export const calculateTotals = (cart) => {
  cart.itemCount = cart.items.length;
  cart.quantity = cart.items.reduce(
    (sum, item) => sum + item.currentQuantity,
    0
  );
  cart.total = cart.items.reduce(
    (sum, item) => sum + item.price * item.currentQuantity,
    0
  );
  cart.shipping = cart.total > 100 ? 0 : 9.99;
  cart.tax = cart.total * 0.08;
};
