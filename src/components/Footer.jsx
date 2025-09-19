import { Container, Text } from "@mantine/core";

const data = [
  {
    title: "About",
    links: [
      { label: "Features", link: "#" },
      { label: "Pricing", link: "#" },
      { label: "Support", link: "#" },
      { label: "Forums", link: "#" },
    ],
  },
  {
    title: "Project",
    links: [
      { label: "Contribute", link: "#" },
      { label: "Media assets", link: "#" },
      { label: "Changelog", link: "#" },
      { label: "Releases", link: "#" },
    ],
  },
  {
    title: "Community",
    links: [
      { label: "Join Discord", link: "#" },
      { label: "Follow on Twitter", link: "#" },
      { label: "Email newsletter", link: "#" },
      { label: "GitHub discussions", link: "#" },
    ],
  },
];

export function Footer() {
  return (
    <footer
      className="py-10 mt-16"
      style={{
        backgroundColor: "var(--color-dark)",
        color: "var(--color-light)",
      }}
    >
      <Container className="flex flex-col md:flex-row md:justify-between gap-10">
        {/* Logo + description */}
        <div className="max-w-xs">
          <Text className="text-lg font-bold">MyShop</Text>
          <Text
            size="sm"
            style={{ color: "var(--color-gray-light)" }}
            className="mt-2"
          >
            Build fully functional accessible web applications faster than ever
          </Text>
        </div>

        {/* Links */}
        <div className="flex gap-16">
          {data.map((group) => (
            <div key={group.title}>
              <Text className="font-semibold mb-2">{group.title}</Text>
              <div className="flex flex-col gap-2">
                {group.links.map((link, i) => (
                  <a
                    key={i}
                    href={link.link}
                    style={{ color: "var(--color-gray-light)" }}
                    className="text-sm hover:text-[--color-accent] transition"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Container>

      {/* Bottom bar */}
      <Container
        className="mt-10 pt-6 flex justify-between items-center"
        style={{ borderTop: "1px solid var(--color-gray)" }}
      >
        <Text size="sm" style={{ color: "var(--color-gray-light)" }}>
          © {new Date().getFullYear()} MyShop. All rights reserved.
        </Text>
      </Container>
    </footer>
  );
}
