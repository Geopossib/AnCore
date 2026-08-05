import SectionHeader from '../SectionHeader';
import useReveal from '../../hooks/useReveal';

const CASES = [
  { type: 'mfg', img: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=600&q=80', alt: 'Titanium turbine components for commercial aircraft engines on a manufacturing line', title: 'Aerospace Component Manufacturer', stat: '+156% Qualified Leads' },
  { type: 'avionics', img: 'https://images.unsplash.com/photo-1517976487492-5750f3195933?auto=format&fit=crop&w=600&q=80', alt: 'Avionics technology and next-generation flight deck systems', title: 'Avionics Technology Company', stat: '+212% Website Traffic' },
  { type: 'mro', img: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=600&q=80', alt: 'Commercial aircraft undergoing maintenance and repair in an MRO hangar', title: 'MRO & Engineering Firm', stat: '+85% Marketing ROI' },
  { type: 'space', img: 'https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?auto=format&fit=crop&w=600&q=80', alt: 'Rocket launch representing a small-satellite space tech startup', title: 'Space Tech Startup', stat: '+300% Lead Growth' },
];

function CaseCard({ item, delay, onOpen }) {
  const { ref, className, style } = useReveal(delay);
  return (
    <div
      ref={ref}
      className={`panel rounded-xl overflow-hidden cursor-pointer hover-lift ${className}`}
      style={style}
      onClick={() => onOpen(item.type)}
    >
      <img src={item.img} className="w-full h-28 object-cover" alt={item.alt} loading="lazy" />
      <div className="p-5">
        <h4 className="font-bold text-sm mb-1">{item.title}</h4>
        <p className="text-gold text-xs font-bold">{item.stat}</p>
      </div>
    </div>
  );
}

export default function Portfolio({ setView, onOpenCase }) {
  return (
    <section className="view-section py-20">
      <SectionHeader num="03" label="Portfolio / Case Studies" />
      <h2 className="font-head text-3xl font-extrabold mb-2">Proven Results</h2>
      <p className="text-muted text-sm mb-10 max-w-lg">Real results for forward-thinking brands.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {CASES.map((c, i) => (
          <CaseCard key={c.type} item={c} delay={i * 0.1} onOpen={onOpenCase} />
        ))}
      </div>
      <button onClick={() => setView('about')} className="text-sm font-semibold text-gold mb-10 block">
        View All Case Studies →
      </button>

      <div className="flex justify-between">
        <button onClick={() => setView('services')} className="text-sm font-semibold text-muted">← Services</button>
        <button onClick={() => setView('about')} className="text-sm font-semibold text-gold">Next: About Us →</button>
      </div>
    </section>
  );
}
