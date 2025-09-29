import { Carousel } from "@mantine/carousel";

export function ProductDetailCarousel({ images }) {
  return (
    <Carousel
      withIndicators
      emblaOptions={{ dragFree: true, align: "start" }}
      slideGap="md"
      height={"50vh"}
      className="w-full rounded-lg overflow-hidden"
    >
      {images?.map((image, ind) => (
        <Carousel.Slide
          key={ind}
          className="flex justify-center items-center bg-white"
        >
          <img
            src={image}
            alt={`product-${ind}`}
            className="h-fit w-auto object-contain"
          />
        </Carousel.Slide>
      ))}
    </Carousel>
  );
}
