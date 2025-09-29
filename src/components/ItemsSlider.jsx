import { useState, useRef, useEffect } from "react";
import { SubmitButton } from "./Form";
import ProductCard from "./ProductCard";
import { Button } from "@mantine/core";

const ProductCarousel = ({ items = [], title = "Featured Products" }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(4);
  const carouselRef = useRef(null);

  // Update items per view based on screen size
  useEffect(() => {
    const updateItemsPerView = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setItemsPerView(1);
      } else if (width < 768) {
        setItemsPerView(2);
      } else if (width < 1024) {
        setItemsPerView(2);
      } else if (width < 1400) {
        setItemsPerView(3);
      } else if (width < 2200) {
        setItemsPerView(4);
      } else if (width < 2800) {
        setItemsPerView(4);
      } else {
        setItemsPerView(4);
      }
    };

    updateItemsPerView();
    window.addEventListener("resize", updateItemsPerView);
    return () => window.removeEventListener("resize", updateItemsPerView);
  }, []);
  console.log(items, "items");
  const maxIndex = Math.max(0, items.length - itemsPerView);

  const goToPrevious = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(price);
  };

  if (!items || items.length === 0) {
    return null;
  }

  return (
    <section className="relative content-spacing  py-16  ">
      {/* Header with Flash Sale badge and navigation */}
      <div className="flex items-center   justify-between gap-2 mb-6">
        <div className="hidden sm:flex items-center gap-4">
          <div className="flex items-center gap-2 bg-gray-900 rounded-full px-4 py-2">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
              <svg
                className="w-4 h-4 text-gray-900"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <span className="text-white font-semibold">{title}</span>
          </div>
        </div>

        {/* Navigation arrows */}
        <div className="flex w-full sm:w-fit justify-center sm:justify-end   gap-2">
          <Button
            onClick={goToPrevious}
            disabled={currentIndex === 0}
            size="sm"
            className="   disabled:cursor-not-allowed flex items-center justify-center  transition-colors"
            aria-label="Previous products"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </Button>
          <Button
            onClick={goToNext}
            disabled={currentIndex >= maxIndex}
            size="sm"
            className=" disabled:cursor-not-allowed flex items-center justify-center  transition-colors"
            aria-label="Next products"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Button>
        </div>
      </div>

      {/* Carousel container */}
      <div className="relative  overflow-x-hidden h-[26rem]" ref={carouselRef}>
        <div
          className="flex transition-transform  duration-500 ease-in-out gap-4"
          style={{
            transform: `translateX(-${(currentIndex * 100) / itemsPerView}%)`,
          }}
        >
          {items.map((item, index) => {
            const safeTitle =
              item.title?.toString().slice(0, 100) || "Untitled Product";
            const safeDescription =
              item.description?.toString().slice(0, 150) ||
              "No description available";
            return (
              <div
                key={item.id || index}
                className="flex-shrink-0 "
                style={{
                  width: `calc(${100 / itemsPerView}% - 1rem)`,
                }}
              >
                <ProductCard item={item} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProductCarousel;
