import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from "gsap/TextPlugin";
import { SplitText } from "gsap/SplitText";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger, TextPlugin, SplitText);

function HeroAbout() {
  const container = useRef(null);

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
    <section ref={container} className="min-h-screen bg-light-gray">
      <div className="grid grid-cols-1 content-spacing md:grid-cols-[1.5fr_1fr] h-[calc(100vh-98px)]">
        <div className="flex items-center justify-center p-6 sm:p-8 md:p-12 lg:p-16 xl:p-20">
          <div className="max-w-3xl">
            <h1
              className="font-black   leading-none tracking-tight mb-4 sm:mb-6 md:mb-8
                text-5xl
                sm:text-6xl 
                md:text-7xl 
                lg:text-7xl 
                xl:text-8xl 
                2xl:text-9xl"
            >
              <span className="textImage inline-block redefine-text ">
                REDEFINE
              </span>
              <br />
              <span className="text">YOUR</span>
              <br />
              <span className="textImage inline-block style-text">STYLE </span>
              <span className="text"> NOW</span>
            </h1>

            <p
              className="font-medium  leading-relaxed
                text-base
                sm:text-lg
                md:text-xl
                lg:text-xl
                xl:text-2xl
                2xl:text-3xl
                max-w-xl"
            >
              From fashion to tech, find everything that makes you extraordinary
              at neoCart.
            </p>
          </div>
        </div>

        <div className="flex items-center justify-start relative overflow-hidden">
          <img src="cart.png" alt="shoe img" className="w-full cart-img" />
        </div>
      </div>
    </section>
  );
}

export default HeroAbout;
