export default function About() {
  return (
    <main className="min-h-screen bg-dark">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="diagonal-bg"></div>
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              About <span className="text-gray-light">Neo Cart</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-light max-w-3xl mx-auto">
              Revolutionizing e-commerce with cutting-edge technology and
              exceptional customer experiences
            </p>
          </div>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="bg-glass backdrop-blur-sm border border-gray-light/20 rounded-2xl p-8">
              <h2 className="text-3xl font-bold text-white mb-6">Our Story</h2>
              <p className="text-gray-light text-lg mb-4">
                Founded in 2020, Neo Cart emerged from a simple vision: to
                create the most intuitive and powerful e-commerce platform that
                bridges the gap between technology and human connection.
              </p>
              <p className="text-gray-light text-lg mb-4">
                What started as a small team of passionate developers and
                designers has grown into a global platform serving millions of
                customers worldwide, while maintaining our core values of
                innovation, quality, and customer satisfaction.
              </p>
              <p className="text-gray-light text-lg">
                Today, we continue to push boundaries, leveraging AI and machine
                learning to create personalized shopping experiences that feel
                natural and effortless.
              </p>
            </div>
            <div className="relative">
              <img
                src="logo.png"
                alt="Neo Cart team working"
                className="rounded-2xl w-full h-96 object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-glass backdrop-blur-sm border border-gray-light/20 rounded-2xl p-8">
              <div className="w-16 h-16 bg-gray-light/20 rounded-full flex items-center justify-center mb-6">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                Our Mission
              </h3>
              <p className="text-gray-light text-lg">
                To democratize e-commerce by providing cutting-edge tools and
                technologies that empower businesses of all sizes to thrive in
                the digital marketplace, while delivering exceptional
                experiences to every customer.
              </p>
            </div>
            <div className="bg-glass backdrop-blur-sm border border-gray-light/20 rounded-2xl p-8">
              <div className="w-16 h-16 bg-gray-light/20 rounded-full flex items-center justify-center mb-6">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Our Vision</h3>
              <p className="text-gray-light text-lg">
                To become the world's most trusted and innovative e-commerce
                platform, where technology seamlessly connects people with
                products they love, creating a sustainable and inclusive digital
                economy.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Meet Our Leadership
            </h2>
            <p className="text-gray-light text-lg max-w-2xl mx-auto">
              The visionary minds behind Neo Cart's success, bringing decades of
              experience in technology, design, and business.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* CEO */}
            <div className="bg-glass backdrop-blur-sm border border-gray-light/20 rounded-2xl p-6 text-center">
              <img
                src="logo.png"
                alt="Sarah Chen - CEO"
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-bold text-white mb-2">Sarah Chen</h3>
              <p className="text-gray-light mb-3">Chief Executive Officer</p>
              <p className="text-gray-light text-sm">
                Former VP at Amazon, Sarah brings 15+ years of e-commerce
                expertise and a passion for customer-centric innovation.
              </p>
            </div>

            {/* CTO */}
            <div className="bg-glass backdrop-blur-sm border border-gray-light/20 rounded-2xl p-6 text-center">
              <img
                src="logo.png"
                alt="Marcus Rodriguez - CTO"
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-bold text-white mb-2">
                Marcus Rodriguez
              </h3>
              <p className="text-gray-light mb-3">Chief Technology Officer</p>
              <p className="text-gray-light text-sm">
                Ex-Google engineer with expertise in AI and scalable systems,
                Marcus leads our technical innovation and platform architecture.
              </p>
            </div>

            {/* CPO */}
            <div className="bg-glass backdrop-blur-sm border border-gray-light/20 rounded-2xl p-6 text-center">
              <img
                src="logo.png"
                alt="Emma Thompson - CPO"
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-bold text-white mb-2">
                Emma Thompson
              </h3>
              <p className="text-gray-light mb-3">Chief Product Officer</p>
              <p className="text-gray-light text-sm">
                Award-winning designer from Apple, Emma ensures every product
                interaction is intuitive, beautiful, and meaningful.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Our Values
            </h2>
            <p className="text-gray-light text-lg max-w-2xl mx-auto">
              The principles that guide every decision we make and every product
              we build.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-glass backdrop-blur-sm border border-gray-light/20 rounded-2xl p-6 text-center">
              <div className="w-12 h-12 bg-gray-light/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Innovation</h3>
              <p className="text-gray-light text-sm">
                Constantly pushing boundaries to create breakthrough solutions.
              </p>
            </div>

            <div className="bg-glass backdrop-blur-sm border border-gray-light/20 rounded-2xl p-6 text-center">
              <div className="w-12 h-12 bg-gray-light/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">
                Customer First
              </h3>
              <p className="text-gray-light text-sm">
                Every decision starts with understanding our customers' needs.
              </p>
            </div>

            <div className="bg-glass backdrop-blur-sm border border-gray-light/20 rounded-2xl p-6 text-center">
              <div className="w-12 h-12 bg-gray-light/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Trust</h3>
              <p className="text-gray-light text-sm">
                Building lasting relationships through transparency and
                reliability.
              </p>
            </div>

            <div className="bg-glass backdrop-blur-sm border border-gray-light/20 rounded-2xl p-6 text-center">
              <div className="w-12 h-12 bg-gray-light/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Excellence</h3>
              <p className="text-gray-light text-sm">
                Delivering the highest quality in everything we create.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-glass backdrop-blur-sm border border-gray-light/20 rounded-2xl p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">
                Neo Cart by the Numbers
              </h2>
              <p className="text-gray-light text-lg">
                Our impact in the global e-commerce ecosystem
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-white mb-2">2.5M+</div>
                <div className="text-gray-light">Active Users</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-white mb-2">150K+</div>
                <div className="text-gray-light">Partner Stores</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-white mb-2">$2.8B</div>
                <div className="text-gray-light">Transaction Volume</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-white mb-2">99.9%</div>
                <div className="text-gray-light">Uptime</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-glass backdrop-blur-sm border border-gray-light/20 rounded-2xl p-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Join Our Journey?
            </h2>
            <p className="text-gray-light text-lg mb-8">
              Whether you're a customer, partner, or potential team member, we'd
              love to hear from you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-dark px-8 py-3 rounded-lg font-semibold hover:bg-gray-light transition-colors">
                Contact Us
              </button>
              <button className="border border-gray-light text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-light/10 transition-colors">
                Join Our Team
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
