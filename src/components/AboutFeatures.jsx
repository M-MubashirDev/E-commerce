// import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from "gsap/TextPlugin";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger, TextPlugin, SplitText);

function AboutFeatures() {
  const container = useRef(null);

  const features = [
    {
      image: "deliveryBox.png",
      title: "Fast Delivery",
      description:
        "Same-day delivery in metros. Get your products within 24-48 hours nationwide.",
      classNamed: "fast",
    },
    {
      image: "pay.png",
      title: "Secure Payments",
      description:
        "Bank-level encryption. Multiple payment options for your convenience.",
      classNamed: "secure",
    },
    {
      image: "quality.png",
      title: "Premium Quality",
      description:
        "Handpicked products. Every item verified for authenticity and quality.",
      classNamed: "premium",
    },
  ];
  useGSAP(
    () => {
      gsap.from(".features-text", {
        y: 100,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".features-text",
          start: "top 80%",
          end: "top 50%",
          scrub: 1,
        },
      });
      gsap.from(".feature", {
        x: -50,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".feature",
          start: "top 80%",
          end: "top 50%",
          scrub: 1,
        },
      });
    },
    { scope: container }
  );
  return (
    <div ref={container} className="content-spacing top-div">
      <h1
        className="font-black features-text text-white text-center leading-none tracking-tight mb-4 sm:mb-6 md:mb-8
                text-5xl
                sm:text-6xl 
                md:text-7xl 
                lg:text-7xl 
                xl:text-8xl 
                2xl:text-9xl"
      >
        <span className="textImageBlack">Features</span> That <br /> Matter
      </h1>
      <div className="w-full flex justify-center ">
        <p
          className="font-medium sm:w-[70%] text-white  text-center leading-relaxed
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
      <div className="flex gap-2 justify-around flex-col md:flex-row  mt-20">
        {features.map(({ title, description, image }, ind) => {
          return (
            <div
              key={ind}
              className={`flex flex-col  space-y-2 max-w-md feature`}
            >
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
