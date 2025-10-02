import { Text } from "@mantine/core";

const data = [
  {
    title: "About",
    links: [
      { label: "Features", link: "#" },
      { label: "Pricing", link: "#" },
    ],
  },
  {
    title: "Project",
    links: [
      { label: "Contribute", link: "#" },
      { label: "Media assets", link: "#" },
    ],
  },
  {
    title: "Community",
    links: [
      { label: "Join Discord", link: "#" },
      { label: "Follow on Twitter", link: "#" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-light-gray border-t border-medium-gray text-[--text-darker-gray]">
      <div className="container mx-auto px-10 py-10 flex flex-col md:flex-row md:justify-between gap-10">
        {/* Logo + description */}
        <div className="max-w-sm">
          <img src="/mainLogo.png" alt="MyShop Logo" className="w-40 mb-3" />
          <Text size="sm" className="text-dark-gray leading-relaxed">
            Build fully functional accessible web applications faster than ever.
          </Text>
        </div>

        {/* Links */}
        <div className="grid grid-cols-2 sm:grid-cols-3 w-full md:w-auto justify-between gap-4 ">
          {data.map((group) => (
            <div key={group.title} className="min-w-[120px]">
              <Text className="font-semibold text-dark mb-2">
                {group.title}
              </Text>
              <div className="flex flex-col gap-2">
                {group.links.map((link, i) => (
                  <a
                    key={i}
                    href={link.link}
                    className="text-sm text-dark-gray hover:text-dark transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="container mx-auto px-10 border-t border-medium-gray py-6 text-center sm:text-left flex flex-col sm:flex-row justify-between items-center gap-4">
        <Text size="sm" className="text-dark-gray">
          © {new Date().getFullYear()} MyShop. All rights reserved.
        </Text>
        <div className="flex gap-6">
          <a href="#" className="text-sm text-dark-gray hover:text-dark">
            Privacy Policy
          </a>
          <a href="#" className="text-sm text-dark-gray hover:text-dark">
            Terms of Service
          </a>
        </div>
      </div>
    </footer>
  );
}
