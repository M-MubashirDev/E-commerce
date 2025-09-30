import { useDispatch, useSelector } from "react-redux";
import { fetchProduct } from "../features/products/productsThunks";
import { useEffect } from "react";
import { ProductDetailCarousel } from "../ui/ProductDetailCarasoul";
import { Button } from "@mantine/core";
import { useParams } from "react-router-dom";
import { setCartItem } from "../features/cart/cartSlice";

function Product() {
  const dispatch = useDispatch();
  const { id } = useParams();

  const { loading, error, product } = useSelector((state) => state.products);
  const { images, price, title, description, category } = product || {};

  function HandleAddTOCart() {
    dispatch(
      setCartItem({
        category: category,
        id: id,
        images: images,
        price: price,
        title: title,
        description: description,
      })
    );
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
      {/* Responsive flex layout */}
      <div className="flex flex-col lg:flex-row gap-8 content-spacing">
        {/* Left side (carousel + thumbnails) */}
        <div className="w-full lg:w-1/2 flex flex-col">
          <div className="flex-1">
            <ProductDetailCarousel images={images} />
          </div>
          <div className="flex gap-4 justify-center lg:justify-evenly items-center h-[70px] mt-4">
            {images?.map((image, ind) => (
              <img
                key={ind}
                src={image}
                alt={`product-${ind}`}
                className="h-full rounded-md w-auto object-contain cursor-pointer"
              />
            ))}
          </div>
        </div>

        {/* Right side (details) */}
        <div className="w-full lg:w-1/2 p-6 flex flex-col gap-6 ">
          {/* Category */}
          <span className="text-xs sm:text-sm text-gray-500 uppercase tracking-wide">
            {category?.name}
          </span>

          {/* Title */}
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-dark-gray">
            {title}
          </h1>

          {/* Price */}
          <div className="flex items-baseline gap-3">
            <span className="text-2xl sm:text-3xl font-semibold text-primary">
              ${price}
            </span>
            <span className="text-sm sm:text-base text-gray-400 line-through">
              ${price + 10}
            </span>
          </div>

          {/* Description with lines */}
          <div className="flex flex-col gap-3">
            {/* <div className="h-px bg-dark-gray w-[80%] mx-auto" /> */}

            <div className="h-px bg-dark-gray w-[80%] mx-auto" />
            <div>
              <h2 className="font-semibold mb-1">Description:</h2>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                {description}
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button fullWidth onClick={HandleAddTOCart}>
              Add To Cart
            </Button>
            <Button fullWidth variant="outline">
              Checkout Now
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Product;
