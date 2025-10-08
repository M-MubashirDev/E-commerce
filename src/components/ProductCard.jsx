import { Button, Tooltip } from "@mantine/core";
import { useDispatch } from "react-redux";
import { setCartItem } from "../features/cart/cartSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const ProductCard = ({ item }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formatPrice = (price) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(price);

  function HandleAddTOCart() {
    try {
      dispatch(
        setCartItem({
          category: item.category,
          id: item.id,
          images: item.images,
          price: item.price,
          title: item.title,
          description: item.description,
        })
      );
      toast.success(`${item.title} added to the cart`);
    } catch {
      toast.error("Error");
    }
  }

  const safeTitle = item.title?.toString().slice(0, 100) || "Untitled Product";
  const safeDescription =
    item.description?.toString().slice(0, 150) || "No description available";

  return (
    <div className="bg-white max-w-[14rem] sm:max-w-[16rem] font-secondary min-w-[14rem]  sm:min-w-[14rem] mx-auto backdrop-blur-sm rounded-2xl relative group hover:shadow-xl transition-shadow shadow-md h-88 flex flex-col">
      {/* Wishlist heart */}
      <button className="absolute top-2 right-2 z-10 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-50 transition-colors">
        <svg
          className="w-4 h-4 hover:text-red-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
      </button>

      {/* Image */}
      <div
        onClick={() => navigate(`/Product/${item?.id}`)}
        className="h-48 rounded-t-2xl cursor-pointer  overflow-hidden flex-shrink-0"
      >
        <img
          src={item.images?.[0] || item.image}
          alt={item.title || item.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
      </div>

      {/* Content */}
      <div className="p-4 flex-grow flex flex-col justify-between relative">
        <div className="space-y-3">
          <h3 className="font-semibold text-dark text-base leading-tight truncate transition-colors">
            {safeTitle}
          </h3>
          <Tooltip
            label={item.description}
            position="bottom-start"
            multiline
            withArrow
            color="white"
            c={"dark"}
            className="border-1 text-start max-w-60 border-medium-gray"
            transitionProps={{ duration: 150 }}
          >
            <p className="text-sm text-dark-gray line-clamp-2 leading-relaxed ">
              {safeDescription}
            </p>
          </Tooltip>

          <div className="flex items-center gap-3">
            <span className="font-bold text-dark text-lg">
              {formatPrice(item.price)}
            </span>
            {item.oldPrice && (
              <span className="text-sm text-dark-gray line-through">
                {formatPrice(item.oldPrice)}
              </span>
            )}
          </div>
        </div>
        <div className="absolute -bottom-3 left-[40%]">
          <Button onClick={HandleAddTOCart}>Add to Cart</Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
