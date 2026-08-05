export default function SectionHeader({ num, label }) {
  return (
    <div className="flex items-center gap-3 mb-8">
      <span className="badge-num w-7 h-7 rounded flex items-center justify-center text-[11px] font-bold">{num}</span>
      <span className="text-xs font-bold uppercase tracking-widest text-muted">{label}</span>
    </div>
  );
}
