function FeatureCard({ title, text, icon: Icon }) {
  return (
    <div className="rounded-[2rem] border border-white/10 bg-[#0B223D] p-6 hover:bg-[#102B4C] hover:-translate-y-2 transition shadow-lg">
      <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center mb-6">
        <Icon size={30} className="text-[#071A2F]" />
      </div>

      <h4 className="text-xl font-black mb-3 text-white">{title}</h4>
      <p className="text-sm text-slate-400 leading-6">{text}</p>
    </div>
  );
}

export default FeatureCard;