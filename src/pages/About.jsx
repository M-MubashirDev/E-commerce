import { Button } from "@mantine/core";
import { HeadingTitle, HeadingSubtitle } from "../ui/Headings";
import { FaUsers, FaShippingFast, FaHandshake, FaAward } from "react-icons/fa";

export default function AboutPage() {
  return (
    <div className="font-secondary">
      {/* Hero Section */}
      <section
        style={{ backgroundImage: "url('/shirt.jpg')" }}
        className="relative flex flex-col items-center justify-center 
                   bg-no-repeat bg-center bg-cover 
                   py-20 md:py-24 overflow-hidden"
      >
        <div className="absolute inset-0 bg-black/60"></div>

        <div className="relative content-spacing text-center z-10 max-w-4xl mx-auto">
          <p className="text-sm text-light mb-4">#About NeoCart</p>
          <HeadingTitle>
            Redefining Online Shopping <br /> With Style & Trust
          </HeadingTitle>
          <HeadingSubtitle>
            We're here to make your shopping experience effortless, inspiring,
            and unforgettable
          </HeadingSubtitle>
        </div>
      </section>

      {/* Mission Section */}
      <section className="bg-light py-16 md:py-20">
        <div className="content-spacing grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="order-2 md:order-1">
            <p className="text-sm text-dark-gray mb-2">#Our Mission</p>
            <HeadingTitle color="!text-dark">
              Shopping Should Be Effortless & Inspiring
            </HeadingTitle>
            <p>
              At NeoCart, we believe in bringing you products that fit your
              lifestyle with ease. From trending fashion to timeless classics,
              every item is carefully curated to match your style.
            </p>
            <Button className="mt-6">Explore Products</Button>
          </div>
          <div className="order-1 md:order-2">
            <img
              src="/modern-shopping-experience.png"
              alt="Our mission"
              className="rounded-2xl shadow-xl w-full h-[300px] md:h-[400px] object-cover"
            />
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-light-gray py-16 md:py-20">
        <div className="content-spacing text-center">
          <p className="text-sm text-dark-gray mb-2">#What Drives Us</p>
          <HeadingTitle color="!text-dark">
            More Than Products — <br /> We Deliver Excellence
          </HeadingTitle>
          <HeadingSubtitle>
            Trust, speed, and style are at the heart of everything we do
          </HeadingSubtitle>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all p-8">
              <div className="w-16 h-16 bg-light-gray rounded-full flex items-center justify-center mx-auto mb-4">
                <FaUsers size={32} className="text-dark" />
              </div>
              <h3 className="text-lg font-bold text-dark mb-3">
                Customer First
              </h3>
              <p className="text-dark-gray text-sm leading-relaxed">
                Every decision revolves around making your experience smooth and
                delightful
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all p-8">
              <div className="w-16 h-16 bg-light-gray rounded-full flex items-center justify-center mx-auto mb-4">
                <FaShippingFast size={32} className="text-dark" />
              </div>
              <h3 className="text-lg font-bold text-dark mb-3">
                Fast Delivery
              </h3>
              <p className="text-dark-gray text-sm leading-relaxed">
                Quick shipping with real-time tracking and safe packaging
                guaranteed
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all p-8">
              <div className="w-16 h-16 bg-light-gray rounded-full flex items-center justify-center mx-auto mb-4">
                <FaHandshake size={32} className="text-dark" />
              </div>
              <h3 className="text-lg font-bold text-dark mb-3">
                Trusted Service
              </h3>
              <p className="text-dark-gray text-sm leading-relaxed">
                Secure payments and easy returns make shopping with us
                worry-free
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all p-8">
              <div className="w-16 h-16 bg-light-gray rounded-full flex items-center justify-center mx-auto mb-4">
                <FaAward size={32} className="text-dark" />
              </div>
              <h3 className="text-lg font-bold text-dark mb-3">
                Quality Promise
              </h3>
              <p className="text-dark-gray text-sm leading-relaxed">
                Every product is carefully selected to meet our high standards
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
            />
          </div>
          <div>
            <p className="text-sm text-dark-gray mb-2">#Our Story</p>
            <HeadingTitle color="!text-dark">
              Built By Shoppers, <br /> For Shoppers
            </HeadingTitle>
            <HeadingSubtitle>
              NeoCart started with a simple idea: online shopping should be as
              enjoyable as walking through your favorite store. We've built a
              platform that combines the convenience of e-commerce with the
              personal touch of boutique shopping.
            </HeadingSubtitle>
            <div className="flex gap-4 mt-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-dark">50K+</p>
                <p className="text-sm text-dark-gray mt-1">Happy Customers</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-dark">10K+</p>
                <p className="text-sm text-dark-gray mt-1">Products</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-dark">99%</p>
                <p className="text-sm text-dark-gray mt-1">Satisfaction</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="bg-light-gray py-16 md:py-20">
        <div className="content-spacing text-center">
          <p className="text-sm text-dark-gray mb-2">#Meet The Team</p>
          <HeadingTitle color="!text-dark">
            The People Behind <br /> Your Shopping Experience
          </HeadingTitle>
          <HeadingSubtitle>
            A passionate team dedicated to bringing you the best
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
                />
                <div className="p-6">
                  <h3 className="text-lg font-bold text-dark mb-1">
                    {member.name}
                  </h3>
                  <p className="text-sm text-dark-gray">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call To Action */}
      <section className="bg-light py-16 md:py-20">
        <div className="content-spacing text-center max-w-3xl mx-auto">
          <p className="text-sm text-dark-gray mb-2">#Join Us</p>
          <HeadingTitle color="!text-dark">
            Ready to Experience <br /> The NeoCart Difference?
          </HeadingTitle>
          <HeadingSubtitle>
            Join thousands of happy customers who trust us for their shopping
            needs
          </HeadingSubtitle>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Button size="lg">Start Shopping</Button>
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
