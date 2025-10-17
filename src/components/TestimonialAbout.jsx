import { useGSAP } from "@gsap/react";
import TestimonialCard from "../ui/TestimonialCard";
import { useRef } from "react";
import gsap from "gsap";
import { Button } from "@mantine/core";

function TestimonialAbout() {
  const container = useRef(null);
  const testimonials = [
    {
      name: "Evelyn Carter",
      role: "Product Designer",
      message: "A stunning user experience! The performance blew my mind.",
      image:
        "https://static.vecteezy.com/system/resources/thumbnails/037/098/807/small/ai-generated-a-happy-smiling-professional-man-light-blurry-office-background-closeup-view-photo.jpg",
    },
    {
      name: "Liam Foster",
      role: "Marketing Head",
      message: "Their attention to detail made our campaign a success.",
      image: "batman.jpg",
    },
    {
      name: "Noah Lee",
      role: "Frontend Engineer",
      message:
        "Smooth animations and great responsiveness — top quality work!.",
      image: "batman.jpg",
    },
    {
      name: "Sophia Turner",
      role: "Business Owner",
      message: "Delivered on time, and exceeded our design expectations.",
      image: "batman.jpg",
    },
    {
      name: "Ava Mitchell",
      role: "UI/UX Specialist",
      message: "Loved the modern, clean design. Highly recommended!",
      image: "batman.jpg",
    },
  ];
  useGSAP(
    () => {
      const cards = gsap.utils.toArray(".testimoninalCard");

      cards.forEach((card, i) => {
        const isEven = i % 2 === 0;
        const yOffset = isEven ? 40 : 0;
        gsap.to(card, {
          y: yOffset,
          duration: 0.8,
          ease: "power3.out",
        });
      });
    },
    { scope: container }
  );

  return (
    <div
      ref={container}
      className="flex item flex-col  gap-4 justify-center py-12 content-spacing "
    >
      <div className="flex items-center  w-full justify-evenly">
        {testimonials.map(({ name, role, message, image }, ind) => (
          <div key={name} className="  testimoninalCard">
            <TestimonialCard
              message={message}
              role={role}
              name={name}
              image={image}
              ind={ind}
            />
          </div>
        ))}
      </div>
      <div className="flex items-center flex-col justify-center mt-20">
        <img src="mainLogo.png" />
        <div className="w-full flex justify-center mt-2">
          <p
            className="font-medium w-[70%] text-[#4a5565]   text-center leading-relaxed
                text-base
                sm:text-md
                md:text-lg
                lg:text-lg
                xl:text-xl
                2xl:text-2xl
                "
          >
            We&apos;ve built neoCart with everything you need for a seamless
            shopping experience. Fast delivery, secure payments, and premium
            quality products - all backed by 24/7 support.
          </p>
        </div>
        <Button mt={16}>Get Started</Button>
        {/* <h1
          className="font-black   leading-none tracking-tight mb-4 sm:mb-6 md:mb-8
                text-5xl
                sm:text-6xl 
                md:text-7xl 
                lg:text-7xl 
                xl:text-8xl 
                2xl:text-9xl"
        >
          {" "}
          LET&apos;S
          <span className="textImage  redefine-text "> START</span>
        </h1> */}
      </div>
    </div>
  );
}

export default TestimonialAbout;
