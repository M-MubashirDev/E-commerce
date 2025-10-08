import { Button } from "@mantine/core";
import { HeadingTitle, HeadingSubtitle } from "../ui/Headings";
import { FaUsers, FaShippingFast, FaHandshake, FaAward } from "react-icons/fa";

export default function AboutPage() {
  return (
    <div className="font-[DM_Sans,sans-serif]">
      {/* Hero Section */}
      <section
        style={{ backgroundImage: "url('/shirt.jpg')" }}
        className="relative flex flex-col items-center justify-center 
                   bg-no-repeat bg-center bg-cover 
                   py-16 md:py-20 overflow-hidden"
      >
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative content-spacing z-10 max-w-4xl mx-auto">
          <p className="text-sm text-light mb-4 font-medium">#About NeoCart</p>
          <HeadingTitle className="!text-white">
            Discover Style, Shop with Confidence
          </HeadingTitle>
          <HeadingSubtitle className="!text-light-gray">
            Your one-stop destination for curated fashion and seamless shopping
          </HeadingSubtitle>
        </div>
      </section>

      {/* Mission Section */}
      <section className="bg-light py-16 md:py-20">
        <div className="content-spacing grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="order-2 md:order-1">
            <p className="text-sm text-dark font-medium mb-2">#Our Mission</p>
            <HeadingTitle color="!text-dark">
              Curated Style, Delivered Simply
            </HeadingTitle>
            <p className="text-dark text-base leading-relaxed mt-2">
              At NeoCart, we make shopping effortless by curating products that
              match your unique style, from trendy fashion to timeless
              essentials.
            </p>
            <Button
              className="mt-6"
              size="lg"
              onClick={() => (window.location.href = "/products")}
            >
              Explore Products
            </Button>
          </div>
          <div className="order-1 md:order-2">
            <img
              src="/modern-shopping-experience.png"
              alt="Our mission"
              className="rounded-2xl shadow-xl w-full h-[300px] md:h-[400px] object-cover"
              onError={(e) => {
                e.target.src = "logo.png";
              }}
            />
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-light-gray py-16 md:py-20">
        <div className="content-spacing text-center">
          <p className="text-sm text-dark font-medium mb-2">#What Drives Us</p>
          <HeadingTitle color="!text-dark">
            Excellence in Every Detail
          </HeadingTitle>
          <HeadingSubtitle>
            Quality, trust, and style define our commitment to you
          </HeadingSubtitle>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all p-8">
              <div className="w-16 h-16 bg-light-gray rounded-full flex items-center justify-center mx-auto mb-4">
                <FaUsers size={32} className="text-dark" />
              </div>
              <h3 className="text-lg font-bold text-dark mb-3">
                Customer First
              </h3>
              <p className="text-dark text-base leading-relaxed">
                Your satisfaction is our priority, with seamless shopping and
                dedicated support.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all p-8">
              <div className="w-16 h-16 bg-light-gray rounded-full flex items-center justify-center mx-auto mb-4">
                <FaShippingFast size={32} className="text-dark" />
              </div>
              <h3 className="text-lg font-bold text-dark mb-3">
                Fast Delivery
              </h3>
              <p className="text-dark text-base leading-relaxed">
                Swift shipping with real-time tracking and secure packaging.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all p-8">
              <div className="w-16 h-16 bg-light-gray rounded-full flex items-center justify-center mx-auto mb-4">
                <FaHandshake size={32} className="text-dark" />
              </div>
              <h3 className="text-lg font-bold text-dark mb-3">
                Trusted Service
              </h3>
              <p className="text-dark text-base leading-relaxed">
                Shop worry-free with secure payments and hassle-free returns.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all p-8">
              <div className="w-16 h-16 bg-light-gray rounded-full flex items-center justify-center mx-auto mb-4">
                <FaAward size={32} className="text-dark" />
              </div>
              <h3 className="text-lg font-bold text-dark mb-3">
                Quality Promise
              </h3>
              <p className="text-dark text-base leading-relaxed">
                Every product meets our rigorous standards for quality and
                style.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="bg-light py-16 md:py-20">
        <div className="content-spacing grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div>
            <img
              src="/team-collaboration-workspace.png"
              alt="Our story"
              className="rounded-2xl shadow-xl w-full h-[300px] md:h-[400px] object-cover"
              onError={(e) => {
                e.target.src = "logo.png";
              }}
            />
          </div>
          <div>
            <p className="text-sm text-dark font-medium mb-2">#Our Story</p>
            <HeadingTitle color="!text-dark">
              Crafted for Shoppers, by Shoppers
            </HeadingTitle>
            <HeadingSubtitle>
              NeoCart blends the ease of online shopping with the charm of a
              boutique experience, offering curated style for everyone.
            </HeadingSubtitle>
            <div className="flex gap-6 mt-6 justify-center md:justify-start">
              <div className="text-center">
                <p className="text-3xl font-bold text-dark">50K+</p>
                <p className="text-sm text-dark mt-1">Happy Customers</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-dark">10K+</p>
                <p className="text-sm text-dark mt-1">Products</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-dark">99%</p>
                <p className="text-sm text-dark mt-1">Satisfaction</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="bg-light-gray py-16 md:py-20">
        <div className="content-spacing text-center">
          <p className="text-sm text-dark font-medium mb-2">#Our Team</p>
          <HeadingTitle color="!text-dark">
            Meet the Faces Behind NeoCart
          </HeadingTitle>
          <HeadingSubtitle>
            A dedicated team passionate about your shopping experience
          </HeadingSubtitle>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12 max-w-5xl mx-auto">
            {[
              {
                name: "Sarah Johnson",
                role: "Founder & CEO",
                img: "professional woman ceo",
              },
              {
                name: "Michael Chen",
                role: "Head of Design",
                img: "professional man designer",
              },
              {
                name: "Emily Rodriguez",
                role: "Customer Success",
                img: "professional woman customer service",
              },
            ].map((member, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all overflow-hidden"
              >
                <img
                  src={`/.jpg?height=300&width=300&query=${member.img}`}
                  alt={member.name}
                  className="w-full h-64 object-cover"
                  onError={(e) => {
                    e.target.src = "logo.png";
                  }}
                />
                <div className="p-6">
                  <h3 className="text-lg font-bold text-dark mb-1">
                    {member.name}
                  </h3>
                  <p className="text-base text-dark">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call To Action */}
      <section className="bg-light py-16 md:py-20">
        <div className="content-spacing text-center max-w-3xl mx-auto">
          <p className="text-sm text-dark font-medium mb-2">#Join Us</p>
          <HeadingTitle color="!text-dark">
            Experience Shopping Redefined
          </HeadingTitle>
          <HeadingSubtitle>
            Join our community of style enthusiasts and shop with confidence
          </HeadingSubtitle>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Button
              size="lg"
              onClick={() => (window.location.href = "/products")}
            >
              Start Shopping
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="!border-dark !text-dark hover:!bg-light-gray bg-transparent"
            >
              Contact Us
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
