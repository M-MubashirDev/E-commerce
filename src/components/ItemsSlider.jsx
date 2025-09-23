"use client";

import { Button } from "@mantine/core";
import { useState, useRef, useEffect } from "react";
import { SubmitButton } from "./Form";

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
        setItemsPerView(3);
      } else if (width < 1400) {
        setItemsPerView(4);
      } else if (width < 2200) {
        setItemsPerView(5);
      } else if (width < 2800) {
        setItemsPerView(6);
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
    <section className="relative px-4 py-16  ">
      {/* Header with Flash Sale badge and navigation */}
      <div className="flex items-center justify-between gap-2 mb-6">
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
          <button
            onClick={goToPrevious}
            disabled={currentIndex === 0}
            className="w-10 h-10 rounded-lg border border-gray-600 bg-gray-800 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center text-white transition-colors"
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
          </button>
          <button
            onClick={goToNext}
            disabled={currentIndex >= maxIndex}
            className="w-10 h-10 rounded-lg bg-gray-900 hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center text-white transition-colors"
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
          </button>
        </div>
      </div>

      {/* Carousel container */}
      <div
        className="relative py-2 overflow-x-hidden h-[26rem]"
        ref={carouselRef}
      >
        <div
          className="flex transition-transform duration-500 ease-in-out"
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
                className="flex-shrink-0 px-2"
                style={{ width: `${100 / itemsPerView}%` }}
              >
                <div className="bg-white  max-w-[16rem] mx-auto  transition-hover  backdrop-blur-sm  rounded-2xl relative group hover:shadow-xl transition-shadow shadow-md  h-88 flex flex-col">
                  {/* Wishlist heart */}
                  <button className="absolute top-2 right-2 z-10 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-50 transition-colors">
                    <svg
                      className="w-4 h-4 text- hover:text-red-500"
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

                  <div className="h-48 rounded-t-2xl overflow-hidden flex-shrink-0">
                    <img
                      src={item.images?.[0] || item.image}
                      alt={item.title || item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                  </div>

                  {/* Content */}
                  {/* Content */}
                  <div className="p-4 flex-grow flex flex-col justify-between relative">
                    <div className="space-y-3">
                      <h3 className="font-semibold text-dark text-base leading-tight truncate transition-colors">
                        {safeTitle}
                      </h3>
                      <p className="text-sm text-dark-gray line-clamp-2 leading-relaxed">
                        {safeDescription}
                      </p>
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
                    <div className="absolute  -bottom-4 left-[50%]">
                      <SubmitButton>Add to Cart</SubmitButton>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProductCarousel;
