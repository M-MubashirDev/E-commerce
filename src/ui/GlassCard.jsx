function GlassCard({ children }) {
  return (
    <div className="w-full max-w-md p-8 rounded-2xl bg-glass backdrop-blur-lg border border-white/20 shadow-xl relative z-10">
      {children}
    </div>
  );
}

export default GlassCard;
