import { Modal, Text } from "@mantine/core";
import { ProductDetailCarousel } from "../ui/ProductDetailCarasoul";

function CartModel({
  opened,
  selectedItem,
  activeIndex,
  setActiveIndex,
  setOpened,
}) {
  console.log("CartModel selectedItem:", selectedItem);
  return (
    <Modal
      opened={opened}
      onClose={() => setOpened(false)}
      title={selectedItem?.title}
      centered
      size="lg"
    >
      {selectedItem && (
        <div className="flex flex-col items-center gap-4">
          <ProductDetailCarousel
            images={selectedItem.productImages}
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
          />

          <div className="flex gap-3 justify-center items-center h-[70px] mt-2">
            {selectedItem.productImages?.map((image, ind) => (
              <img
                key={ind}
                src={image?.url}
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

          <Text size="sm" className="text-dark-gray mt-4">
            {selectedItem.description}
          </Text>
        </div>
      )}
    </Modal>
  );
}

export default CartModel;
