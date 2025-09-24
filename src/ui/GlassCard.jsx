function GlassCard({ children }) {
  return (
    <div className="w-full    h-fit max-w-md lg:max-w-lg xl:max-w-xl  px-8 py-4 rounded-2xl bg-glass backdrop-blur-lg border border-white/20 shadow-xl relative z-10">
      {children}
    </div>
  );
}

export default GlassCard;
