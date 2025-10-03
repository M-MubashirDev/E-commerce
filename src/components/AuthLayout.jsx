import GlassCard from "../ui/GlassCard";

export default function AuthLayout({ children }) {
  return (
    <div
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('authBg.png')" }}
    >
      <div className="absolute inset-0 bg-black/30 z-0" />

      <div className="absolute top-6 left-6 z-20">
        <img src="mainLogo.png" alt="logo" className="w-40 drop-shadow-lg" />
      </div>

      {/* Glass card */}
      <div className="relative z-10 flex-1 flex items-start justify-start px-6 sm:px-12 md:px-20 lg:px-32">
        <GlassCard>{children}</GlassCard>
      </div>
    </div>
  );
}
