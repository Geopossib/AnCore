export default function FeatureBar() {
  return (
    <div className="border-t border-line mt-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        <div className="flex items-center gap-3">
          <svg className="w-5 h-5 text-gold flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="11" cy="11" r="7" /><path strokeLinecap="round" d="M21 21l-4.35-4.35" /></svg>
          <div><p className="text-[11px] font-bold">SEO OPTIMIZED</p><p className="text-[10px] text-muted">Rank higher. Get found.</p></div>
        </div>
        <div className="flex items-center gap-3">
          <svg className="w-5 h-5 text-gold flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="7" y="2" width="10" height="20" rx="2" /><path strokeLinecap="round" d="M11 18h2" /></svg>
          <div><p className="text-[11px] font-bold">MOBILE RESPONSIVE</p><p className="text-[10px] text-muted">Seamless on every device.</p></div>
        </div>
        <div className="flex items-center gap-3">
          <svg className="w-5 h-5 text-gold flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="5" y="11" width="14" height="9" rx="1.5" /><path strokeLinecap="round" d="M8 11V7a4 4 0 018 0v4" /></svg>
          <div><p className="text-[11px] font-bold">FAST &amp; SECURE</p><p className="text-[10px] text-muted">Lightning fast. Enterprise level security.</p></div>
        </div>
        <div className="flex items-center gap-3">
          <svg className="w-5 h-5 text-gold flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path strokeLinecap="round" strokeLinejoin="round" d="M4 19V10M12 19V5M20 19v-7" /></svg>
          <div><p className="text-[11px] font-bold">ANALYTICS INTEGRATED</p><p className="text-[10px] text-muted">Track. Measure. Improve.</p></div>
        </div>
        <div className="flex items-center gap-3">
          <svg className="w-5 h-5 text-gold flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="2.5" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.2M12 18.8V21M3 12h2.2M18.8 12H21M5.6 5.6l1.6 1.6M16.8 16.8l1.6 1.6M5.6 18.4l1.6-1.6M16.8 7.2l1.6-1.6" /></svg>
          <div><p className="text-[11px] font-bold">AUTOMATED WORKFLOWS</p><p className="text-[10px] text-muted">Save time. Scale faster.</p></div>
        </div>
        <div className="flex items-center gap-3">
          <svg className="w-5 h-5 text-gold flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="5" width="18" height="14" rx="2" /><path strokeLinecap="round" strokeLinejoin="round" d="M3 7l9 6 9-6" /></svg>
          <div><p className="text-[11px] font-bold">CRM &amp; EMAIL INTEGRATION</p><p className="text-[10px] text-muted">Nurture leads. Close more.</p></div>
        </div>
      </div>
    </div>
  );
}
