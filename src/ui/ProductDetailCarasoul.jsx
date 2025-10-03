import { Carousel } from "@mantine/carousel";
import { useEffect, useState } from "react";

export function ProductDetailCarousel({ images, activeIndex, setActiveIndex }) {
  const [embla, setEmbla] = useState(null);

  // When parent changes activeIndex → move carousel
  useEffect(() => {
    if (embla && activeIndex !== null) {
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

  return (
    <Carousel
      withIndicators
      getEmblaApi={setEmbla}
      emblaOptions={{ align: "start" }}
      slideGap="md"
      className="!rounded-lg xl:max-w-[70vh] overflow-hidden"
    >
      {images?.map((image, ind) => (
        <Carousel.Slide
          key={ind}
          className="bg-light-gray !rounded-lg flex justify-center"
        >
          <img
            src={image}
            alt={`product-${ind}`}
            className="max-h-[60vh] w-auto object-contain !rounded-lg"
          />
        </Carousel.Slide>
      ))}
    </Carousel>
  );
}
