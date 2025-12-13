import { Button } from "@mantine/core";
import ItemQuantityButton from "./ItemQuantityButton";
import { useDispatch, useSelector } from "react-redux";
import { setCartItem } from "../features/cart/cartSlice";
import toast from "react-hot-toast";

function SingleProductDetail({
  title,
  id,
  categoryId,
  price,
  discount,
  description,
  selectedProduct,
  productImages,
}) {
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cart);
  const cartItem = cart.items.find((item) => String(item.id) === String(id));

  console.log(selectedProduct);
  function HandleAddTOCart() {
    if (!selectedProduct) return;
    console.log(selectedProduct);
    try {
      dispatch(
        setCartItem({
          id: String(id),
          categoryId: categoryId,
          images: productImages?.map((img) => img.url) || [],
          price,
          title,
          description,
          discount,
        })
      );
      toast.success(`${title} added to the cart`);
    } catch (error) {
      console.error("Add to cart error:", error);
      toast.error("Something went wrong.");
    }
  }
  return (
    <div className="w-full lg:w-1/2 p-6 flex flex-col space-y-1">
      <span className="text-xs sm:text-sm text-gray-500 uppercase tracking-wide">
        {"Uncategorized"}
      </span>

      <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-dark-gray">
        {title}
      </h1>

      <div className="flex items-baseline gap-3">
        <span className="text-2xl sm:text-3xl font-semibold text-primary">
          ${price}
        </span>
        <span className="text-sm sm:text-base text-gray-400 line-through">
          ${price + discount}
        </span>
      </div>

      <div className="flex flex-col gap-3 py-4 my-2 md:px-4 md:border border-medium-gray rounded-md md:shadow-sm">
        <div>
          <h2 className="font-semibold mb-1">Description:</h2>
          <p className="text-gray-600 text-sm sm:text-md leading-relaxed">
            {description}
          </p>
        </div>
      </div>

      <div className="py-3">
        {cartItem ? (
          <ItemQuantityButton item={cartItem} />
        ) : (
          <Button
            onClick={HandleAddTOCart}
            disabled={!selectedProduct?.quantity}
          >
            {!selectedProduct?.quantity ? "Out of stock" : "Add To Cart"}
          </Button>
        )}
      </div>
    </div>
  );
}

export default SingleProductDetail;
