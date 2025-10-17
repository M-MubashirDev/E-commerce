import { Avatar } from "@mantine/core";

function TestimonialCard({ name, role, message, image }) {
  return (
    <div
      style={{
        backgroundImage: "url('bg-Summery_2.png')",
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
      }}
      className="relative  bg-light w-56 cursor-pointer border-medium-gray h-50 shadow-xl rounded-xl flex flex-col items-center justify-end p-4 transition-all duration-300 hover:scale-105"
    >
      {/* Avatar */}
      <div className="absolute -top-10 left-1/2">
        <Avatar src={image} alt={name} size={80} radius="100%" />
      </div>
      {/* Text */}
      <div className="text-center mt-8 ">
        <h2 className="font-semibold text-dark text-lg font-secondary">
          {name}
        </h2>
        <p className="text-dark-gray text-sm font-medium mb-2">{role}</p>
        <p className="text-[#4a5565] text-sm leading-snug italic px-1">
          “{message}”
        </p>
      </div>
    </div>
  );
}

export default TestimonialCard;
