import { Button, Tooltip } from "@mantine/core";
import { useDispatch, useSelector } from "react-redux";
import { setCartItem } from "../features/cart/cartSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const ProductCard = ({ item }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cart } = useSelector((state) => state.cart);

  const isInCart = cart.items.some(
    (cartItem) => String(cartItem.id) === String(item.id)
  );

  const formatPrice = (price) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(price);

  const discountedPrice = item.price - item.price * (item.discount / 100);

  function HandleAddTOCart() {
    if (isInCart) return;
    console.log(item);
    try {
      dispatch(setCartItem({ ...item }));
      toast.success(`${item.title} added to the cart`);
    } catch (error) {
      toast.error("Error adding to cart");
      console.log(error);
    }
  }

  const safeTitle = item.title?.slice(0, 100) || "Untitled Product";
  const safeDescription =
    item.description?.slice(0, 150) || "No description available";
  return (
    <div className="bg-white max-w-[17rem] sm:max-w-[16rem] font-secondary min-w-[17rem] sm:min-w-[14rem] mx-auto backdrop-blur-sm rounded-2xl relative group hover:shadow-xl transition-shadow shadow-md h-88 flex flex-col">
      <div
        onClick={() => navigate(`/Product/${item?.id}`)}
        className="h-48 rounded-t-2xl cursor-pointer overflow-hidden flex-shrink-0"
      >
        <img
          src={item?.productImages[0]?.url}
          alt={item.title || item.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
      </div>

      <div className="p-4 flex-grow flex flex-col justify-between relative">
        <div className="space-y-3">
          <h3 className="font-semibold text-dark text-base leading-tight truncate">
            {safeTitle}
          </h3>
          <Tooltip
            label={item.description}
            position="bottom-start"
            multiline
            withArrow
            color="white"
            c="dark"
            className="border-1 text-start max-w-60 border-medium-gray"
            transitionProps={{ duration: 150 }}
          >
            <p className="text-sm text-dark-gray line-clamp-2 leading-relaxed">
              {safeDescription}
            </p>
          </Tooltip>

          <div className="flex items-center gap-3">
            <span className="font-bold text-dark text-lg">
              {formatPrice(discountedPrice)}
            </span>

            {item.discount > 0 && (
              <span className="text-sm text-gray-400 line-through">
                {formatPrice(item.price)}
              </span>
            )}
          </div>
        </div>

        <div className="absolute -bottom-3 left-[40%]">
          {item?.quantity === 0 ? (
            <Button disabled={!item?.quantity}>Out of Stock</Button>
          ) : (
            <Button onClick={HandleAddTOCart} disabled={isInCart}>
              {isInCart ? "Added" : "Add to Cart"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
