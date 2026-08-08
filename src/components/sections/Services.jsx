import useReveal from '../../hooks/useReveal';
import heroImage from '../../assets/images/about-aircraft-sunset-01.jpg';

const SERVICES = [
  { label: 'Digital Marketing', desc: 'Data-driven strategies that increase visibility and ROI.', d: 'M13 2L3 14h7l-1 8 10-12h-7z' },
  { label: 'Website Development', desc: 'Fast, responsive and conversion-focused websites.', d: 'M4 5h16v14H4z M4 9h16', rect: true },
  { label: 'Branding & Identity', desc: 'Build a strong, memorable brand that stands out.', d: 'M12 2l2.5 6.5L21 11l-6.5 2.5L12 20l-2.5-6.5L3 11l6.5-2.5z' },
  { label: 'Social Media Management', desc: 'Engage your audience and grow your community.', d: 'M7.7 7.3L10.3 16M16.3 7.3L13.7 16M8 6h8', dots: true },
  { label: 'SEO & Analytics', desc: 'Rank higher and convert more with smart SEO.', d: 'M11 19a8 8 0 100-16 8 8 0 000 16zM21 21l-4.35-4.35' },
  { label: 'Content Marketing', desc: 'Powerful content that informs, engages and converts.', d: 'M7 9h10M7 13h10M7 17h6', box: true },
  { label: 'Paid Advertising', desc: 'Target the right audience and maximize ROI.', d: 'M3 11l16-6-5 16-3-6-6-2z' },
  { label: 'Email Marketing', desc: 'Nurture leads and build long-term relationships.', d: 'M4 5h16v11H8l-4 4z', envelope: true },
];

const HERO_IMAGE = {
  src: heroImage,
  alt: 'Commercial aircraft climbing into a purple and orange sunset sky',
};

function ServiceIcon({ s }) {
  return (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      {s.rect && <rect x="4" y="5" width="16" height="14" rx="1.5" />}
      {s.box && <rect x="4" y="4" width="16" height="16" rx="1.5" />}
      {s.envelope && <rect x="3" y="6" width="18" height="12" rx="1.5" />}
      {s.dots && (
        <>
          <circle cx="6" cy="6" r="2" /><circle cx="18" cy="6" r="2" /><circle cx="12" cy="18" r="2" />
        </>
      )}
      <path strokeLinecap="round" strokeLinejoin="round" d={s.d} />
    </svg>
  );
}

function ServiceCard({ s, delay }) {
  const { ref, className, style } = useReveal(delay);
  return (
    <div ref={ref} className={className} style={style}>
      <div className="bg-white border border-gray-200 rounded-xl p-6 h-full hover-lift-light">
        <div className="w-11 h-11 rounded-lg bg-[#C8922E]/10 text-[#C8922E] flex items-center justify-center mb-4">
          <ServiceIcon s={s} />
        </div>
        <h4 className="font-poppins font-semibold text-[#1D2433] text-sm mb-1.5">{s.label}</h4>
        <p className="text-xs text-gray-500 leading-relaxed mb-3">{s.desc}</p>
        <span className="text-xs font-semibold text-[#C8922E]">Learn More →</span>
      </div>
    </div>
  );
}

export default function Services({ setView, onBook }) {
  const heroReveal = useReveal(0);
  const ctaReveal = useReveal(0);

  return (
    <>
      {/* ===== PAGE HERO ===== */}
      <section className="relative left-1/2 w-screen -translate-x-1/2" style={{ background: '#071C44' }}>
        <div className="absolute inset-0 overflow-hidden">
          <img src={HERO_IMAGE.src} alt={HERO_IMAGE.alt} className="w-full h-full object-cover opacity-40" loading="eager" />
          <div className="absolute inset-0" style={{ background: 'rgba(7,28,68,0.75)' }} />
        </div>
        <div ref={heroReveal.ref} className={`relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center ${heroReveal.className}`} style={heroReveal.style}>
          <p className="text-white/50 text-xs mb-3">
            <button onClick={() => setView('home')} className="hover:text-white">Home</button> / Services
          </p>
          <h1 className="font-poppins font-bold text-4xl text-white mb-3">Our Services</h1>
          <p className="text-white/70 text-sm">End-to-end marketing solutions tailored to help your business grow.</p>
        </div>
      </section>

      {/* ===== SERVICE GRID ===== */}
      <section className="relative left-1/2 w-screen -translate-x-1/2 bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-14">
          {SERVICES.map((s, i) => (
            <ServiceCard key={s.label} s={s} delay={(i % 3) * 0.08} />
          ))}
        </div>

        {/* ===== CTA BAND ===== */}
        <div ref={ctaReveal.ref} className={ctaReveal.className} style={ctaReveal.style}>
          <div className="rounded-xl px-6 sm:px-12 py-12 text-center" style={{ background: '#071C44' }}>
            <h2 className="font-poppins font-bold text-2xl sm:text-3xl text-white mb-2">Need a Custom Solution?</h2>
            <p className="text-white/60 text-sm mb-6">Let&apos;s discuss how we can help your business achieve its goals.</p>
            <button onClick={onBook} className="btn-gold px-6 py-3.5 rounded font-semibold text-sm">
              Book Free Consultation →
            </button>
          </div>
        </div>
        </div>
      </section>
    </>
  );
}
