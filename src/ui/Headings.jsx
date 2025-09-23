import { Text, Title } from "@mantine/core";

export function HeadingSubtitle({ children, maxWidth = "max-w-2xl" }) {
  return (
    <Text
      data-aos="fade-up"
      my="md"
      className="!text-gray-100"
      classNames={{
        root: `!${maxWidth}  text-light lg:!text-[1.4rem]  md:!text-[1.2rem] !text-[1rem] !tracking-wide !text-center md:!text-start !leading-relaxed`,
      }}
    >
      {children}
    </Text>
  );
}

export function HeadingTitle({ children, maxWidth = "max-w-3xl" }) {
  return (
    <Title
      data-aos="fade-up"
      className="!text-light"
      classNames={{
        root: `lg:!text-[3rem] sm:!text-[2rem] md:!text-[2.5rem] !text-[1.7rem] !font-bold !text-center md:!text-start  !tracking-wide !leading-tight !break-words !${maxWidth} !mx-auto`,
      }}
    >
      {children}
    </Title>
  );
}
