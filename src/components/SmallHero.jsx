import { HeadingTitle, HeadingSubtitle } from "../ui/Headings";

export default function SmallHero() {
  return (
    <section
      style={{ backgroundImage: "url('/shirt.jpg')" }}
      className="relative flex flex-col md:flex-row items-center justify-between 
                 bg-no-repeat bg-center bg-cover 
                 py-10 md:h-[250px] container mx-auto  overflow-hidden 
                          "
    >
      {/* Overlay layer */}
      <div className="absolute inset-0  bg-black/60 md:bg-black/60"></div>

      {/* Text Section */}
      <div className="relative content-spacing flex-1 text-center  md:text-left z-10">
        <p className="text-sm text-light mb-2"> #Discover Your Style</p>
        <HeadingTitle>
          {" "}
          Shop by Category, <br /> Find Your Perfect Fit
        </HeadingTitle>
        <HeadingSubtitle>
          Find styles you’ll love, all in one place
        </HeadingSubtitle>
      </div>
    </section>
  );
}
