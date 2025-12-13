import { Carousel } from "@mantine/carousel";
import { useEffect, useState } from "react";

export function ProductDetailCarousel({ images, activeIndex, setActiveIndex }) {
  const [embla, setEmbla] = useState(null);

  // When parent changes activeIndex → move carousel
  useEffect(() => {
    if (embla && activeIndex !== null && activeIndex !== undefined) {
      embla.scrollTo(activeIndex);
    }
  }, [activeIndex, embla]);

  // When carousel changes → update activeIndex
  useEffect(() => {
    if (embla) {
      const handleSelect = () => {
        setActiveIndex(embla.selectedScrollSnap());
      };
      embla.on("select", handleSelect);

      // cleanup
      return () => {
        embla.off("select", handleSelect);
      };
    }
  }, [embla, setActiveIndex]);

  // Handle case when images array is empty or undefined
  if (!images || images.length === 0) {
    return (
      <div className="bg-light-gray rounded-lg flex justify-center items-center h-[60vh] xl:max-w-[70vh]">
        <p className="text-gray-500">No images available</p>
      </div>
    );
  }

  return (
    <Carousel
      withIndicators
      getEmblaApi={setEmbla}
      emblaOptions={{ align: "start", loop: true, dragFree: false }}
      slideGap="md"
      className="!rounded-lg xl:max-w-[70vh] overflow-hidden"
    >
      {images.map((image, index) => (
        <Carousel.Slide
          key={image.id || index}
          className="bg-light-gray !rounded-lg flex justify-center"
        >
          <img
            src={image?.url}
            alt={`product-${image.id || index}`}
            className="max-h-[60vh] w-auto object-contain !rounded-lg"
          />
        </Carousel.Slide>
      ))}
    </Carousel>
  );
}
