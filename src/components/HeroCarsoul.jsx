import { Carousel } from "@mantine/carousel";
import { Button } from "@mantine/core";

export default function HeroCarousel() {
  const slides = [
    {
      id: 1,
      title: "Limited Time Offer!",
      subtitle: "Up to 50% OFF!",
      desc: "Redefine Your Everyday Style",
      image: "/images/fashion.jpg",
    },
    {
      id: 2,
      title: "Hot Electronics Deals",
      subtitle: "Save Big Today",
      desc: "Latest gadgets at best prices",
      image: "/images/electronics.jpg",
    },
    {
      id: 3,
      title: "Fresh Arrivals",
      subtitle: "New Collection Out Now",
      desc: "Trendy picks you’ll love",
      image: "/images/new-arrivals.jpg",
    },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto h-[280px]">
      <Carousel loop withIndicators>
        {slides.map((item) => (
          <Carousel.Slide key={item.id}>
            <div className="flex items-center justify-between bg-white rounded-lg shadow-md h-[280px] px-8">
              {/* Text */}
              <div>
                <p className="text-gray-500 text-sm">#Big Sale</p>
                <h1 className="text-2xl font-bold">{item.title}</h1>
                <h2 className="text-xl text-accent font-semibold">
                  {item.subtitle}
                </h2>
                <p className="text-gray-600">{item.desc}</p>
                <Button mt="sm" color="dark">
                  Shop Now
                </Button>
              </div>

              {/* Image */}
              <div className="w-[200px] h-[200px] flex items-center justify-center">
                <img
                  src={item.image}
                  alt={item.title}
                  className="object-contain max-h-full"
                />
              </div>
            </div>
          </Carousel.Slide>
        ))}
      </Carousel>
    </div>
  );
}
