import { Carousel } from "@mantine/carousel";
import { useEffect, useState } from "react";

export function ProductDetailCarousel({ images, activeIndex }) {
  const [embla, setEmbla] = useState(null);

  useEffect(() => {
    if (embla && activeIndex !== null) {
      embla.scrollTo(activeIndex);
    }
  }, [activeIndex, embla]);

  return (
    <Carousel
      withIndicators
      getEmblaApi={setEmbla} // expose embla API
      emblaOptions={{ dragFree: true, align: "start" }}
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
