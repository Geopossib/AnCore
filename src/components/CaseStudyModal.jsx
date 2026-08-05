const CASE_STUDIES = {
  mfg: 'Titanium Turbine Components Supplier',
  avionics: 'Next-Gen Flight Deck Avionics Suite',
  mro: 'Global Commercial Aircraft MRO Firm',
  space: 'Small-Satellite Launch Services Startup',
};

export default function CaseStudyModal({ open, type, onClose, onBook }) {
  if (!open) return null;
  const title = CASE_STUDIES[type] || 'Case Study';

  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
      <div className="panel max-w-lg w-full rounded-xl p-8 relative">
        <button onClick={onClose} className="absolute top-5 right-5 text-muted hover:text-white text-lg">✕</button>
        <h3 className="font-head text-xl font-bold mb-4">{title}</h3>
        <div className="space-y-3 text-xs text-muted leading-relaxed">
          <p className="p-3 rounded bg-surface2">
            <strong className="text-white block mb-1">The Challenge:</strong>
            Long sales cycles and low inbound volume from qualified buyers.
          </p>
          <p className="p-3 rounded bg-surface2">
            <strong className="text-gold block mb-1">Our Solution:</strong>
            A targeted ABM engine paired with programmatic SEO landing pages.
          </p>
        </div>
        <button onClick={onBook} className="w-full mt-5 btn-gold py-3 rounded font-semibold text-xs">
          Replicate These Results
        </button>
      </div>
    </div>
  );
}
