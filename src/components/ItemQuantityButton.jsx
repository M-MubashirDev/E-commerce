import { ActionIcon, Text } from "@mantine/core";
import { useDispatch } from "react-redux";
import { setCartItem, setReduceItem } from "../features/cart/cartSlice";
import { FiMinus, FiPlus, FiTrash2 } from "react-icons/fi";

function ItemQuantityButton({ item }) {
  const dispatch = useDispatch();

  const updateQuantity = (item, type) => {
    if (type === "increase") {
      dispatch(setCartItem({ ...item }));
    } else {
      dispatch(setReduceItem({ ...item }));
    }
    // Later you can add decrease/remove actions
  };
  return (
    <div>
      <div className="flex items-center bg-white/20 rounded-lg border border-white/30">
        {item?.currentQuantity > 1 ? (
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
            {item?.currentQuantity}
          </Text>
        </div>
        <ActionIcon
          onClick={() => updateQuantity(item, "increase")}
          color="dark"
          disabled={item?.currentQuantity >= item?.quantity}
          variant="subtle"
          size="sm"
        >
          <FiPlus size={14} />
        </ActionIcon>
      </div>
    </div>
  );
}

export default ItemQuantityButton;
