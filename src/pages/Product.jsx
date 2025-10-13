import { useDispatch, useSelector } from "react-redux";
import { fetchProduct } from "../features/products/productsThunks";
import { useEffect, useState } from "react";
import { ProductDetailCarousel } from "../ui/ProductDetailCarasoul";
import { Button } from "@mantine/core";
import { useParams } from "react-router-dom";
import { setCartItem } from "../features/cart/cartSlice";
import toast from "react-hot-toast";
import ItemQuantityButton from "../components/ItemQuantityButton";

function Product() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [activeIndex, setActiveIndex] = useState(0);

  const { loading, error, selectedProduct } = useSelector(
    (state) => state.products
  );
  const { cart } = useSelector((state) => state.cart);
  console.log(selectedProduct);
  const { images, price, title, description, category } = selectedProduct || {};

  const cartItem = cart.items.find((item) => item.id === id);

  function HandleAddTOCart() {
    try {
      dispatch(
        setCartItem({
          category,
          id,
          images,
          price,
          title,
          description,
        })
      );
      toast.success(`${title} added to the cart`);
    } catch {
      toast.error("Something went wrong.");
    }
  }

  useEffect(() => {
    dispatch(fetchProduct(id));
  }, [dispatch, id]);

  if (loading) return <h1>loading</h1>;
  if (error) return <h1>error</h1>;

  return (
    <section
      style={{
        backgroundImage: "url('/bg-Summery_2.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="bg-light-gray py-8 lg:py-12"
    >
      <div className="flex flex-col lg:flex-row gap-8 content-spacing">
        {/* Left side (carousel + thumbnails) */}
        <div className="w-full lg:w-1/2 flex flex-col">
          <div className="flex justify-center ">
            <ProductDetailCarousel
              images={images}
              activeIndex={activeIndex}
              setActiveIndex={setActiveIndex}
            />
          </div>
          {/* Thumbnails */}
          <div className="flex gap-4 justify-center items-center h-[70px] mt-4">
            {images?.map((image, ind) => (
              <img
                key={ind}
                src={image}
                alt={`product-thumb-${ind}`}
                className={`h-full rounded-md w-auto object-contain cursor-pointer transition ${
                  activeIndex === ind
                    ? "ring-1 ring-primary scale-105"
                    : "opacity-70 hover:opacity-100"
                }`}
                onClick={() => setActiveIndex(ind)}
              />
            ))}
          </div>
        </div>

        {/* Right side (details) */}
        <div className="w-full lg:w-1/2 p-6 flex flex-col space-y-1">
          <span className="text-xs sm:text-sm text-gray-500 uppercase tracking-wide">
            {category?.name}
          </span>

          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-dark-gray">
            {title}
          </h1>

          <div className="flex items-baseline gap-3">
            <span className="text-2xl sm:text-3xl font-semibold text-primary">
              ${price}
            </span>
            <span className="text-sm sm:text-base text-gray-400 line-through">
              ${price + 10}
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
              <Button fullWidth onClick={HandleAddTOCart}>
                Add To Cart
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Product;
