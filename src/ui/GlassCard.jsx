function GlassCard({ children }) {
  return (
    <div className="w-full lg:min-w-[100%] xl:min-w-[80%]  min-h-fit  max-w-md px-8 py-4 rounded-2xl bg-glass backdrop-blur-lg border border-white/20 shadow-xl relative z-10">
      {children}
    </div>
  );
}

export default GlassCard;
