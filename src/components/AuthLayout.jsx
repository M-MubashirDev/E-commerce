import GlassCard from "../ui/GlassCard";

export default function AuthLayout({ children }) {
  return (
    <div className="relative min-h-screen flex items-center justify-center">
      {/* Background */}
      <div className="diagonal-bg"></div>

      {/* Glassy Auth Card */}
      <GlassCard>{children}</GlassCard>
    </div>
  );
}
