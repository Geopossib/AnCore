import SectionHeader from '../SectionHeader';
import useReveal from '../../hooks/useReveal';
import servicesImage from '../../assets/images/services-digital-dashboard-01.jpg';

const SERVICES = [
  {
    d: 'M3 21l6-6M9 21l6-6M15 21l6-6M12 3l3 3-3 3-3-3z',
    label: 'Strategy & Branding',
    desc: 'Positioning built on verifiable proof — certifications, delivery track record, program history — instead of interchangeable adjectives every competitor already uses.',
  },
  {
    d: 'M13 2L3 14h7l-1 8 10-12h-7z',
    label: 'Digital Marketing',
    desc: 'Campaigns built around 12–24 month sales cycles: account-based outreach to named accounts, not broad-reach advertising aimed at a market that isn\u2019t the actual buying committee.',
  },
  {
    d: 'M5 20c0-3.5 3-6 7-6s7 2.5 7 6',
    circle: true,
    label: 'Lead Generation',
    desc: 'Technical SEO for high-intent, low-volume search terms, gated content worth the trade, and lead scoring built around RFQ-readiness rather than generic engagement signals.',
  },
  {
    d: 'M7 9h10M7 13h10M7 17h6',
    rect: true,
    label: 'Content & SEO',
    desc: 'Whitepapers, spec sheets, and technical comparisons written for engineers who can tell substance from polish in the first paragraph.',
  },
  {
    d: 'M7.7 7.3L10.3 16M16.3 7.3L13.7 16M8 6h8',
    dots: true,
    label: 'Social Media Marketing',
    desc: 'A channel for trade-show follow-up and thought leadership aimed at procurement and engineering audiences — not a volume play for vanity engagement.',
  },
  {
    d: 'M4 19V10M12 19V5M20 19v-7',
    label: 'Analytics & Reporting',
    desc: 'Pipeline-influence reporting at the account level — which content actually moved a named account closer to an RFQ, not aggregate traffic that doesn\u2019t map to buyers.',
  },
];

export default function Services({ setView }) {
  const listReveal = useReveal(0);
  const imgReveal = useReveal(0.1);

  return (
    <section className="view-section py-20">
      <SectionHeader num="02" label="Services" />
      <h2 className="font-head text-3xl font-extrabold mb-2">Our Services</h2>
      <p className="text-muted text-sm mb-10 max-w-lg">Specialised marketing solutions for complex industries.</p>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-10">
        <div ref={listReveal.ref} className={`panel rounded-xl p-8 lg:col-span-7 ${listReveal.className}`} style={listReveal.style}>
          <ul className="divide-y divide-line">
            {SERVICES.map((s) => (
              <li key={s.label} className="py-5 flex items-start gap-4">
                <svg className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  {s.circle && <circle cx="12" cy="8" r="3" />}
                  {s.rect && <rect x="3" y="4" width="18" height="16" rx="1.5" />}
                  {s.dots && (
                    <>
                      <circle cx="6" cy="6" r="2" /><circle cx="18" cy="6" r="2" /><circle cx="12" cy="18" r="2" />
                    </>
                  )}
                  <path strokeLinecap="round" strokeLinejoin="round" d={s.d} />
                </svg>
                <div>
                  <h4 className="font-bold text-sm mb-1">{s.label}</h4>
                  <p className="text-xs text-muted leading-relaxed">{s.desc}</p>
                </div>
              </li>
            ))}
          </ul>
          <button onClick={() => setView('portfolio')} className="w-full mt-6 btn-gold py-3.5 rounded font-semibold text-sm">
            See These Services In Action
          </button>
        </div>
        <div ref={imgReveal.ref} className={`lg:col-span-5 ${imgReveal.className}`} style={imgReveal.style}>
          <div className="rounded-xl overflow-hidden panel hover-lift h-full">
            <img
              src={servicesImage}
              className="w-full h-full min-h-[260px] object-cover"
              alt="Digital marketing dashboard mockup for an aviation charter brand, showing website and app screens"
              loading="lazy"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-between">
        <button onClick={() => setView('home')} className="text-sm font-semibold text-muted">← Homepage</button>
        <button onClick={() => setView('portfolio')} className="text-sm font-semibold text-gold">Next: Portfolio →</button>
      </div>
    </section>
  );
}
