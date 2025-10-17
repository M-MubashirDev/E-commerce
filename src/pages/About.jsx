import HeroAbout from "../components/heroAbout";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import AboutFeatures from "../components/AboutFeatures";
import TestimonialAbout from "../components/TestimonialAbout";

gsap.registerPlugin(ScrollTrigger);

function About() {
  const container = useRef(null);

  useGSAP(
    () => {
      ScrollTrigger.create({
        trigger: ".heroSection",
        start: "top top",
        end: "bottom top",
        pin: true,
        pinSpacing: false,
      });
      ScrollTrigger.create({
        trigger: ".secondSection",
        start: "center top",
        end: "bottom top",
        pin: true,
        pinSpacing: false,
      });

      gsap.to(".heroSection", {
        opacity: 0,
        scrollTrigger: {
          trigger: ".secondSection",
          start: "top bottom",
          end: "bottom bottom",
          scrub: 1,
        },
      });
      gsap.from(".secondSection", {
        scale: "0.9",
        scrollTrigger: {
          trigger: ".secondSection",
          start: "top bottom",
          end: "top 50%",
          scrub: 1,
        },
      });
      gsap.from(".thirdSection", {
        scale: "0.9",
        scrollTrigger: {
          trigger: ".thirdSection",
          start: "top bottom",
          end: "top 50%",
          scrub: 1,
        },
      });
      gsap.to(".secondSection", {
        opacity: 0,
        scrollTrigger: {
          trigger: ".thirdSection",
          start: "top bottom",
          end: "bottom bottom",
          scrub: 1,
        },
      });
    },
    { scope: container }
  );

  return (
    <div ref={container} style={{ minHeight: "300vh" }}>
      {" "}
      {/* Ensure enough scrollable area */}
      <section className="heroSection relative z-10 h-screen">
        <HeroAbout />
      </section>
      <section className="secondSection  min-h-screen relative z-20 bg-black h-fit py-12  rounded-t-[40px]">
        <AboutFeatures />
      </section>
      <section className="thirdSection relative z-30 bg-light-gray h-screen rounded-t-[40px]">
        <TestimonialAbout />
      </section>
    </div>
  );
}

export default About;
