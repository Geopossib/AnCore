import SectionHeader from '../SectionHeader';
import useReveal from '../../hooks/useReveal';
import aboutImage from '../../assets/images/about-aircraft-sunset-01.jpg';

export default function About({ setView }) {
  const textReveal = useReveal(0);
  const imgReveal = useReveal(0.1);

  return (
    <section className="view-section py-20">
      <SectionHeader num="04" label="About Us" />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        <div ref={textReveal.ref} className={`lg:col-span-5 ${textReveal.className}`} style={textReveal.style}>
          <h2 className="font-head text-3xl font-extrabold mb-3">About AnCore</h2>
          <p className="text-muted text-sm mb-6">A team of marketers, strategists and aviation enthusiasts.</p>
          <div className="grid grid-cols-3 gap-4 panel rounded-xl p-6">
            <div><div className="text-2xl font-extrabold text-gold">20+</div><div className="text-[11px] text-muted">Years of Experience</div></div>
            <div><div className="text-2xl font-extrabold text-gold">100+</div><div className="text-[11px] text-muted">Projects Completed</div></div>
            <div><div className="text-2xl font-extrabold text-gold">98%</div><div className="text-[11px] text-muted">Client Satisfaction</div></div>
          </div>
          <button onClick={() => setView('insights')} className="mt-6 btn-outline px-6 py-3 rounded font-semibold text-sm">
            Meet the Team
          </button>
        </div>
        <div ref={imgReveal.ref} className={`lg:col-span-7 ${imgReveal.className}`} style={imgReveal.style}>
          <div className="rounded-xl overflow-hidden panel">
            <img
              src={aboutImage}
              className="w-full h-72 object-cover"
              alt="Commercial aircraft climbing into a purple and orange sunset sky"
              loading="lazy"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-between mt-10">
        <button onClick={() => setView('portfolio')} className="text-sm font-semibold text-muted">← Portfolio</button>
        <button onClick={() => setView('insights')} className="text-sm font-semibold text-gold">Next: Insights / Blog →</button>
      </div>
    </section>
  );
}
