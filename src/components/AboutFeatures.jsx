// import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from "gsap/TextPlugin";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
// import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger, TextPlugin, SplitText);

function AboutFeatures() {
  const features = [
    {
      image: "deliveryBox.png",
      title: "Fast Delivery",
      description:
        "Same-day delivery in metros. Get your products within 24-48 hours nationwide.",
    },
    {
      image: "pay.png",
      title: "Secure Payments",
      description:
        "Bank-level encryption. Multiple payment options for your convenience.",
    },
    {
      image: "quality.png",
      title: "Premium Quality",
      description:
        "Handpicked products. Every item verified for authenticity and quality.",
    },
  ];
  useGSAP(
    () => {
      gsap.from(".redefine-text", {
        y: -100,
        autoAlpha: 0,
        ease: "power2.in",
        duration: 1,
      });
      gsap.from(".style-text", {
        x: -100,
        autoAlpha: 0,
        ease: "power2.in",
        duration: 1,
      });
      gsap.from(".cart-img", {
        x: "100vw",

        ease: "bounce.out",
        duration: 2,
      });
      document.fonts.ready.then(() => {
        let split = SplitText.create(".text", {
          type: "chars, words",
        });
        gsap.from(split.chars, {
          y: 100,
          autoAlpha: 0,
          stagger: { amount: 0.5, from: "random", repeat: 0, yoyo: true },
        });
      });
    },
    { scope: container }
  );
  return (
    <div className="content-spacing">
      <h1
        className="font-black text-white    text-center   leading-none tracking-tight mb-4 sm:mb-6 md:mb-8
                text-5xl
                sm:text-6xl 
                md:text-7xl 
                lg:text-7xl 
                xl:text-8xl 
                2xl:text-9xl"
      >
        <span className="textImageBlack">Features</span> That <br /> Matter
      </h1>
      <div className="w-full flex justify-center">
        <p
          className="font-medium w-[70%] text-white  text-center leading-relaxed
                text-base
                sm:text-lg
                md:text-xl
                lg:text-xl
                xl:text-2xl
                2xl:text-3xl
                "
        >
          We&apos;ve built neoCart with everything you need for a seamless
          shopping experience. Fast delivery, secure payments, and premium
          quality products - all backed by 24/7 support.
        </p>
      </div>
      <div className="flex gap-2 justify-around  mt-20">
        {features.map(({ title, description, image }, ind) => {
          return (
            <div key={ind} className="flex flex-col  space-y-2 max-w-md">
              <img src={image} alt="" className="w-70 h-40" />
              <h1
                className="font-semibold my-4 text-white  
                text-base
                sm:text-xl
                md:text-2xl
                lg:text-3xl
                xl:text-4xl
                2xl:text-5xl
            "
              >
                {title}
              </h1>
              <p
                className="font-medium text-white  leading-relaxed
                text-base
                sm:text-sm
                md:text-md
                lg:text-md
                xl:text-lg
                2xl:text-xl
                "
              >
                {description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default AboutFeatures;
