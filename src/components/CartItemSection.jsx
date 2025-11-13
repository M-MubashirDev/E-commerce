import { Badge, Button, Image, Text } from "@mantine/core";
import ItemQuantityButton from "./ItemQuantityButton";

function CartItemSection({
  formatPrice,
  setSelectedItem,
  setActiveIndex,
  setOpened,
  cartItems,
  cart,
}) {
  return (
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

      <div className="mt-4 p-3 sm:border sm:border-medium-gray rounded-[28px] bg-gray-light space-y-4 lg:max-h-[70vh] lg:overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="border border-medium-gray rounded-[12px] shadow-lg bg-white overflow-hidden"
          >
            <div className="flex flex-col sm:flex-row  items-center gap-4 p-4">
              <div className="w-20 h-20 rounded-xl overflow-hidden bg-white/20 border border-white/30 flex-shrink-0">
                <Image
                  src={"/batman.jpg"}
                  alt={item.title}
                  className="w-full h-full object-cover"
                  fallbackSrc="https://via.placeholder.com/80x80"
                />
              </div>

              <div className="flex-1 min-w-0">
                <Text fw={600} size="lg" className="text-dark mb-1">
                  {item.title}
                </Text>

                <div className="flex items-center justify-center sm:justify-start gap-3 mt-2 ">
                  <ItemQuantityButton item={item} />
                </div>
              </div>

              <div className="flex flex-col items-center gap-2 mt-2 sm:mt-0">
                <Text fw={700} size="xl" className="!text-dark">
                  {formatPrice(item.price * item.currentQuantity)}
                </Text>
                <Button
                  size="xs"
                  variant="light"
                  color="dark"
                  radius="md"
                  onClick={() => {
                    setSelectedItem(item);
                    setActiveIndex(0);
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
  );
}

export default CartItemSection;
