export default function DeltaBadge({ value, positive = true }) {
  return (
    <span
      className={`delta-pulse inline-flex items-center gap-1 text-[10px] font-bold px-1.5 py-0.5 rounded ${
        positive ? 'text-green-400 bg-green-400/10' : 'text-red-400 bg-red-400/10'
      }`}
    >
      <svg className="w-2.5 h-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
        <path strokeLinecap="round" strokeLinejoin="round" d={positive ? 'M6 18L18 6M18 6H9M18 6V15' : 'M6 6L18 18M18 18H9M18 18V9'} />
      </svg>
      {value}
    </span>
  );
}
