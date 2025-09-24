import GlassCard from "../ui/GlassCard";

export default function AuthLayout({ children }) {
  return (
    <div className="relative min-h-screen flex items-center justify-between">
      {/* Background */}
      <div className="diagonal-bg"></div>

      {/* Top-left Logo / Title */}
      <div className="absolute top-6 left-6 z-20">
        <h1 className="text-white text-2xl font-bold tracking-wide">NeoCart</h1>
      </div>

      {/* Left: Glassy Auth Card */}
      <div className="flex-1  flex items-center justify-center  px-6 sm:px-12 md:px-20 h-screen lg:px-32">
        <GlassCard>{children}</GlassCard>
      </div>

      {/* Right: Image */}
      <div className="hidden md:flex flex-1 justify-center items-center pr-8">
        <img
          src="matchWhite.png"
          alt="cart icon"
          className="w-[50%] h-auto object-contain"
        />
      </div>
    </div>
  );
}
