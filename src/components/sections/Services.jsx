import SectionHeader from '../SectionHeader';
import useReveal from '../../hooks/useReveal';
import servicesImage from '../../assets/images/services-digital-dashboard-01.jpg';

const SERVICES = [
  { d: 'M3 21l6-6M9 21l6-6M15 21l6-6M12 3l3 3-3 3-3-3z', label: 'Strategy & Branding' },
  { d: 'M13 2L3 14h7l-1 8 10-12h-7z', label: 'Digital Marketing' },
  { d: 'M5 20c0-3.5 3-6 7-6s7 2.5 7 6', circle: true, label: 'Lead Generation' },
  { d: 'M7 9h10M7 13h10M7 17h6', rect: true, label: 'Content & SEO' },
  { d: 'M7.7 7.3L10.3 16M16.3 7.3L13.7 16M8 6h8', dots: true, label: 'Social Media Marketing' },
  { d: 'M4 19V10M12 19V5M20 19v-7', label: 'Analytics & Reporting' },
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
          <ul className="divide-y divide-line text-sm font-semibold">
            {SERVICES.map((s) => (
              <li key={s.label} className="py-4 flex items-center gap-3">
                <svg className="w-4 h-4 text-gold flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  {s.circle && <circle cx="12" cy="8" r="3" />}
                  {s.rect && <rect x="3" y="4" width="18" height="16" rx="1.5" />}
                  {s.dots && (
                    <>
                      <circle cx="6" cy="6" r="2" /><circle cx="18" cy="6" r="2" /><circle cx="12" cy="18" r="2" />
                    </>
                  )}
                  <path strokeLinecap="round" strokeLinejoin="round" d={s.d} />
                </svg>
                {s.label}
              </li>
            ))}
          </ul>
          <button onClick={() => setView('portfolio')} className="w-full mt-6 btn-gold py-3.5 rounded font-semibold text-sm">
            View All Services
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
