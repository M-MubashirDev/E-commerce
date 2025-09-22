import { Title, Text } from "@mantine/core";

export default function SectionHeading({
  title,
  subtitle,
  align = "center",
  maxWidth = "max-w-3xl",
}) {
  return (
    <div className="mb-8">
      <Title
        data-aos="fade-up"
        ta={align}
        classNames={{
          root: "lg:!text-[3rem] !text-white !tracking-wider ",
        }}
      >
        {title}
      </Title>

      {subtitle && (
        <Text
          data-aos="fade-up"
          lineClamp={3}
          my={"md"}
          ta={align}
          size="lg"
          classNames={{
            root: `!${maxWidth} !mx-auto !text-gray-400 !tracking-wider`,
          }}
        >
          {subtitle}
        </Text>
      )}
    </div>
  );
}
