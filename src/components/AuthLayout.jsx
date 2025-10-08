import GlassCard from "../ui/GlassCard";

export default function AuthLayout({ children }) {
  return (
    <div
      className=" min-h-screen relative  overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('authBg.png')" }}
    >
      <div className="absolute inset-0 bg-black/30 z-0 " />
      <div className="container px-6 relative flex items-center justify-center min-h-screen ">
        <div className="absolute top-6 left-6 z-20">
          <img src="mainLogo.png" alt="logo" className="w-40 drop-shadow-lg" />
        </div>

        {/* Glass card */}
        <div className="relative z-10 flex-1  flex md:items-start items-center justify-center md:justify-start md:ml-12  ">
          <GlassCard>{children}</GlassCard>
        </div>
      </div>
    </div>
  );
}
