export const calculateTotals = (cart) => {
  cart.itemCount = cart.items.length;
  cart.quantity = cart.items.reduce(
    (sum, item) => sum + item.currentQuantity,
    0
  );
  cart.total = cart.items.reduce((sum, item) => {
    const discountedPrice = item.price - item.price * (item.discount / 100);
    return sum + discountedPrice * item.currentQuantity;
  }, 0);
  cart.shipping = 0;
  cart.tax = 0;
};
