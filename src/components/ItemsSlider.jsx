import { useState, useRef, useEffect } from "react";
// import { SubmitButton } from "./Form";
import ProductCard from "./ProductCard";
import { Button } from "@mantine/core";
import HeaderButton from "../ui/HeaderButton";
import { useNavigate } from "react-router-dom";

const ProductCarousel = ({ items = [], title = "Featured Products" }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(4);
  const carouselRef = useRef(null);

  const navigate = useNavigate();
  console.log(items);
  useEffect(() => {
    const updateItemsPerView = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setItemsPerView(1);
      } else if (width < 802) {
        setItemsPerView(2);
      } else if (width < 1280) {
        setItemsPerView(3);
      } else if (width < 1350) {
        setItemsPerView(4);
      } else if (width < 2000) {
        setItemsPerView(5);
      } else if (width < 2800) {
        setItemsPerView(5);
      } else {
        setItemsPerView(5);
      }
    };

    updateItemsPerView();
    window.addEventListener("resize", updateItemsPerView);
    return () => window.removeEventListener("resize", updateItemsPerView);
  }, []);
  const maxIndex = Math.max(0, items.length - itemsPerView);

  const goToPrevious = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
  };

  if (!items || items.length === 0) {
    return null;
  }

  return (
    <section className="relative content-spacing   ">
      <div className="flex items-center flex-col-reverse gap-5 sm:flex-row   justify-between sm:gap-2 mb-6">
        <HeaderButton
          title={`Best in ${title}`}
          handleFunction={() => navigate(`/products?category=${title}`)}
        />

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
