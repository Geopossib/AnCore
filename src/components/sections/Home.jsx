import useReveal from '../../hooks/useReveal';
import useCountUp from '../../hooks/useCountUp';
import MagneticButton from '../MagneticButton';
import TiltCard from '../TiltCard';
import Testimonials from '../Testimonials';

const HERO_IMAGE = {
  src: 'https://images.unsplash.com/photo-1759614581731-4c7090648de0?auto=format&fit=crop&w=1800&q=80',
  alt: 'Private jet parked on the tarmac at dusk with golden runway lighting',
};
const WING_IMAGE = {
  src: 'https://images.unsplash.com/photo-1698584109673-12d97bc70d08?auto=format&fit=crop&w=900&q=80',
  alt: 'View of an airplane wing through the cabin window above the clouds',
};
const CTA_IMAGE = {
  src: 'https://images.unsplash.com/photo-1519012505673-26635fc56af3?auto=format&fit=crop&w=1400&q=80',
  alt: 'Silhouette of an airplane taking off into a golden sunset',
};

const TRUSTED_BY = ['AIR PEACE', 'aerolink', 'GreenWings', 'SkyWay', 'AVIATEK'];

const SERVICES = [
  { label: 'Digital Marketing', desc: 'Data-driven strategies that increase visibility and ROI.', d: 'M13 2L3 14h7l-1 8 10-12h-7z' },
  { label: 'Branding & Identity', desc: 'Build a strong, memorable brand that stands out.', d: 'M12 2l2.5 6.5L21 11l-6.5 2.5L12 20l-2.5-6.5L3 11l6.5-2.5z' },
  { label: 'Website Development', desc: 'Fast, responsive and conversion-focused websites.', d: 'M4 5h16v14H4z M4 9h16', rect: true },
  { label: 'Social Media Management', desc: 'Engage your audience and grow your community.', d: 'M7.7 7.3L10.3 16M16.3 7.3L13.7 16M8 6h8', dots: true },
  { label: 'SEO & Analytics', desc: 'Rank higher and convert more with smart SEO.', d: 'M11 19a8 8 0 100-16 8 8 0 000 16zM21 21l-4.35-4.35' },
  { label: 'Content Marketing', desc: 'Powerful content that informs, engages and converts.', d: 'M7 9h10M7 13h10M7 17h6', box: true },
  { label: 'Paid Advertising', desc: 'Target the right audience and maximize ROI.', d: 'M3 11l16-6-5 16-3-6-6-2z' },
  { label: 'Email Marketing', desc: 'Nurture leads and build long-term relationships.', d: 'M4 5h16v11H8l-4 4z', envelope: true },
];

const INDUSTRIES = [
  { label: 'Aviation', d: 'M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z M9 12l2 2 4-4' },
  { label: 'Engineering', d: 'M12 3c2 2.5 3 5.5 3 8.5 0 2-.6 3.6-1.2 4.7L12 18l-1.8-1.8C9.6 15.1 9 13.5 9 11.5 9 8.5 10 5.5 12 3z' },
  { label: 'SMEs', d: 'M4 21V8l8-5 8 5v13M9 21v-6h6v6', building: true },
  { label: 'NGOs', d: 'M12 20s-7-4.5-7-10a4 4 0 018-1 4 4 0 018 1c0 5.5-7 10-7 10z' },
  { label: 'Startups', d: 'M4 19l16-16M14 3h7v7M8 21l-5-5 3-3 5 5z', rocket: true },
  { label: 'Technology', d: 'M4 4h16v12H4z M9 20h6 M12 16v4', screen: true },
];

const PROJECTS = [
  {
    title: 'Aviation Brand Revamp',
    tags: 'Branding, Website, Digital Marketing',
    img: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=600&q=80',
    alt: 'Aircraft engine turbine components representing an aviation brand revamp project',
  },
  {
    title: 'Engineering Co. Website',
    tags: 'Website Development, SEO',
    img: 'https://images.unsplash.com/photo-1759922378222-47ad736a174d?auto=format&fit=crop&w=600&q=80',
    alt: 'Construction and engineering workers on site reviewing plans',
  },
  {
    title: 'NGO Awareness Campaign',
    tags: 'Social Media, Content Marketing',
    img: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=600&q=80',
    alt: 'Team collaborating on an NGO awareness campaign',
  },
  {
    title: 'Logistics Company Website',
    tags: 'Website Development, SEO',
    img: 'https://images.unsplash.com/photo-1754959035256-8e42db4db9aa?auto=format&fit=crop&w=600&q=80',
    alt: 'Cargo plane on the tarmac representing a logistics company website project',
  },
];

const PROCESS = [
  { n: '01', label: 'Discover', desc: 'We learn about your business and goals.', d: 'M11 19a8 8 0 100-16 8 8 0 000 16zM21 21l-4.35-4.35' },
  { n: '02', label: 'Strategize', desc: 'We craft a data-driven marketing plan.', d: 'M12 3c2 2.5 3 5.5 3 8.5 0 2-.6 3.6-1.2 4.7L12 18l-1.8-1.8C9.6 15.1 9 13.5 9 11.5 9 8.5 10 5.5 12 3z' },
  { n: '03', label: 'Create', desc: 'We build and design compelling assets.', d: 'M12 20h9M16.5 3.5a2.1 2.1 0 013 3L7 19l-4 1 1-4z' },
  { n: '04', label: 'Launch', desc: 'We execute with precision.', d: 'M4 19l16-16M14 3h7v7' },
  { n: '05', label: 'Grow', desc: 'We analyze, optimize and scale results.', d: 'M4 19V10M12 19V5M20 19v-7' },
];

function StatCounter({ value, suffix = '', decimals = 0, label }) {
  const { ref, display } = useCountUp(value, { suffix, decimals });
  return (
    <div ref={ref} className="text-center">
      <div className="text-2xl sm:text-3xl font-extrabold text-navy">{display}</div>
      <div className="text-xs text-gray-500 font-medium mt-1">{label}</div>
    </div>
  );
}

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
        <div className="w-11 h-11 rounded-lg bg-gold/10 text-gold flex items-center justify-center mb-4">
          <ServiceIcon s={s} />
        </div>
        <h4 className="font-bold text-navy text-sm mb-1.5">{s.label}</h4>
        <p className="text-xs text-gray-500 leading-relaxed mb-3">{s.desc}</p>
        <span className="text-xs font-semibold text-gold">Learn More →</span>
      </div>
    </div>
  );
}

function IndustryIcon({ d, building, rocket, screen }) {
  return (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      {building && <rect x="4" y="8" width="16" height="13" rx="1" />}
      {rocket && <path strokeLinecap="round" strokeLinejoin="round" d="M14 3h7v7" />}
      {screen && <rect x="4" y="4" width="16" height="12" rx="1.5" />}
      <path strokeLinecap="round" strokeLinejoin="round" d={d} />
    </svg>
  );
}

function IndustryItem({ industry, delay }) {
  const { ref, className, style } = useReveal(delay);
  return (
    <div ref={ref} className={`flex items-center gap-3 ${className}`} style={style}>
      <div className="icon-ring float-soft w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0">
        <IndustryIcon {...industry} />
      </div>
      <span className="text-sm font-semibold text-white">{industry.label}</span>
    </div>
  );
}

function ProjectCard({ project, delay }) {
  const { ref, className, style } = useReveal(delay);
  return (
    <div ref={ref} className={className} style={style}>
      <TiltCard className="bg-white border border-gray-200 rounded-xl overflow-hidden cursor-pointer">
        <img src={project.img} alt={project.alt} className="w-full h-32 object-cover" loading="lazy" />
        <div className="p-4">
          <h4 className="font-bold text-navy text-sm mb-1">{project.title}</h4>
          <p className="text-[11px] text-gray-500 mb-2">{project.tags}</p>
          <span className="text-xs font-semibold text-gold">View Case Study →</span>
        </div>
      </TiltCard>
    </div>
  );
}

function ProcessStep({ step, delay, isLast }) {
  const { ref, className, style } = useReveal(delay);
  return (
    <div ref={ref} className={`relative text-center flex-1 ${className}`} style={style}>
      {!isLast && (
        <div className="dotline absolute top-7 left-1/2 w-full hidden sm:block" style={{ zIndex: 0 }} />
      )}
      <div className="relative z-10 w-14 h-14 mx-auto rounded-full bg-white border-2 border-gold flex items-center justify-center mb-3 text-gold">
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path strokeLinecap="round" strokeLinejoin="round" d={step.d} />
        </svg>
      </div>
      <span className="text-[10px] font-bold text-gold block mb-1">{step.n}</span>
      <h4 className="font-bold text-navy text-sm mb-1">{step.label}</h4>
      <p className="text-xs text-gray-500 max-w-[140px] mx-auto">{step.desc}</p>
    </div>
  );
}

export default function Home({ setView, onBook }) {
  const heroReveal = useReveal(0);
  const statsReveal = useReveal(0.1);
  const servicesHeaderReveal = useReveal(0);
  const industriesHeaderReveal = useReveal(0);
  const projectsHeaderReveal = useReveal(0);
  const processHeaderReveal = useReveal(0);
  const testimonialsHeaderReveal = useReveal(0);
  const ctaReveal = useReveal(0);

  return (
    <>
      {/* ===== HERO ===== */}
      <section className="relative left-1/2 w-screen -translate-x-1/2 overflow-hidden" style={{ background: "#021739" }}>
        <div className="absolute inset-0">
          <img src={HERO_IMAGE.src} alt={HERO_IMAGE.alt} className="w-full h-full object-cover opacity-60" loading="eager" />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(90deg, rgba(2,23,57,0.96) 20%, rgba(2,23,57,0.55) 65%, rgba(2,23,57,0.3) 100%)' }} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
          <div ref={heroReveal.ref} className={`max-w-2xl ${heroReveal.className}`} style={heroReveal.style}>
            <h1 className="font-head text-4xl sm:text-5xl font-extrabold text-white leading-[1.1] mb-5">
              Strategic Marketing. <br className="hidden sm:block" />
              Measurable <span className="text-gold">Growth.</span>
            </h1>
            <p className="text-white/70 text-base leading-relaxed mb-8 max-w-lg">
              Data-driven strategies that elevate brands, generate leads and drive real business results.
            </p>
            <div className="flex flex-wrap gap-3 mb-12">
              <MagneticButton onClick={onBook} className="btn-gold px-6 py-3.5 rounded font-semibold text-sm">
                Book Free Consultation →
              </MagneticButton>
              <button onClick={() => setView('portfolio')} className="px-6 py-3.5 rounded font-semibold text-sm border border-white/40 text-white hover:bg-white/10 transition">
                View Our Work
              </button>
            </div>
            <p className="text-[11px] uppercase tracking-widest text-white/50 font-semibold mb-3">Trusted by forward-thinking brands worldwide</p>
            <div className="flex flex-wrap items-center gap-x-7 gap-y-2 text-white font-bold text-sm tracking-wide opacity-70">
              {TRUSTED_BY.map((b) => (
                <span key={b}>{b}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Floating stats card */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8" style={{ marginBottom: '-56px' }}>
          <div ref={statsReveal.ref} className={statsReveal.className} style={statsReveal.style}>
            <div className="bg-white rounded-xl shadow-xl px-6 sm:px-10 py-6 grid grid-cols-2 sm:grid-cols-4 gap-6 divide-x divide-gray-100">
              <StatCounter value={50} suffix="+" label="Clients Served" />
              <StatCounter value={120} suffix="+" label="Projects Completed" />
              <StatCounter value={5} suffix="+" label="Industries" />
              <StatCounter value={98} suffix="%" label="Client Satisfaction" />
            </div>
          </div>
        </div>
      </section>

      {/* ===== SERVICES ===== */}
      <section className="relative left-1/2 w-screen -translate-x-1/2 pt-24 pb-20 bg-white">
        <div ref={servicesHeaderReveal.ref} className={`flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 ${servicesHeaderReveal.className}`} style={servicesHeaderReveal.style}>
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-gold block mb-2">Our Services</span>
            <h2 className="font-head text-3xl font-extrabold text-navy mb-2">Solutions that drive impact</h2>
            <p className="text-gray-500 text-sm max-w-md">From strategy to execution, we deliver creative marketing solutions tailored to your business goals.</p>
          </div>
          <button onClick={() => setView('services')} className="px-5 py-3 rounded font-semibold text-sm bg-navy text-white hover:bg-navy/90 transition whitespace-nowrap self-start">
            Explore All Services →
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {SERVICES.map((s, i) => (
            <ServiceCard key={s.label} s={s} delay={(i % 4) * 0.06} />
          ))}
        </div>
      </section>

      {/* ===== INDUSTRIES ===== */}
      <section className="relative left-1/2 w-screen -translate-x-1/2 py-20" style={{ background: '#021739' }}>
        <div className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div ref={industriesHeaderReveal.ref} className={`lg:col-span-5 ${industriesHeaderReveal.className}`} style={industriesHeaderReveal.style}>
            <span className="text-xs font-bold uppercase tracking-widest text-gold block mb-2">Industries We Serve</span>
            <h2 className="font-head text-3xl font-extrabold text-white mb-3">Experts in your world</h2>
            <p className="text-white/60 text-sm mb-6 max-w-sm">We understand your industry and craft strategies that deliver results.</p>
            <button onClick={() => setView('services')} className="px-5 py-3 rounded font-semibold text-sm border border-white/40 text-white hover:bg-white/10 transition">
              View All Industries →
            </button>
          </div>
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
            {INDUSTRIES.map((ind, i) => (
              <IndustryItem key={ind.label} industry={ind} delay={i * 0.08} />
            ))}
          </div>
        </div>
        </div>
      </section>

      {/* ===== FEATURED PROJECTS ===== */}
      <section className="relative left-1/2 w-screen -translate-x-1/2 py-20 bg-white">
        <div ref={projectsHeaderReveal.ref} className={`flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 ${projectsHeaderReveal.className}`} style={projectsHeaderReveal.style}>
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-gold block mb-2">Our Work</span>
            <h2 className="font-head text-3xl font-extrabold text-navy">Featured Projects</h2>
          </div>
          <button onClick={() => setView('portfolio')} className="px-5 py-3 rounded font-semibold text-sm bg-navy text-white hover:bg-navy/90 transition whitespace-nowrap self-start">
            View All Projects →
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {PROJECTS.map((p, i) => (
            <ProjectCard key={p.title} project={p} delay={i * 0.08} />
          ))}
        </div>
      </section>

      {/* ===== PROCESS ===== */}
      <section className="relative left-1/2 w-screen -translate-x-1/2 py-20 text-center bg-white">
        <div ref={processHeaderReveal.ref} className={processHeaderReveal.className} style={processHeaderReveal.style}>
          <span className="text-xs font-bold uppercase tracking-widest text-gold block mb-2">Our Process</span>
          <h2 className="font-head text-3xl font-extrabold text-navy mb-14">A proven path to growth</h2>
        </div>
        <div className="flex flex-col sm:flex-row gap-10 sm:gap-4 max-w-5xl mx-auto">
          {PROCESS.map((step, i) => (
            <ProcessStep key={step.n} step={step} delay={i * 0.1} isLast={i === PROCESS.length - 1} />
          ))}
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="relative left-1/2 w-screen -translate-x-1/2 py-20 bg-white">
        <div ref={testimonialsHeaderReveal.ref} className={testimonialsHeaderReveal.className} style={testimonialsHeaderReveal.style}>
          <span className="text-xs font-bold uppercase tracking-widest text-gold block mb-8">What Our Clients Say</span>
        </div>
        <Testimonials wingImage={WING_IMAGE} />
      </section>

      {/* ===== CTA BANNER ===== */}
      <section className="relative left-1/2 w-screen -translate-x-1/2 overflow-hidden" style={{ background: 'linear-gradient(90deg, #C9980B, #B8890A)' }}>
        <div ref={ctaReveal.ref} className={`relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 lg:grid-cols-12 items-center gap-8 ${ctaReveal.className}`} style={ctaReveal.style}>
          <div className="lg:col-span-7">
            <h2 className="font-head text-3xl font-extrabold text-navy mb-2">Ready to grow your business?</h2>
            <p className="text-navy/80 text-sm mb-6">Let&apos;s build strategies that deliver real results.</p>
            <MagneticButton onClick={onBook} className="px-6 py-3.5 rounded font-semibold text-sm bg-navy text-white hover:bg-navy/90 transition">
              Book Your Free Consultation →
            </MagneticButton>
          </div>
        </div>
        <div className="absolute inset-y-0 right-0 w-1/2 hidden lg:block" style={{ maskImage: 'linear-gradient(90deg, transparent, black 30%)' }}>
          <img src={CTA_IMAGE.src} alt={CTA_IMAGE.alt} className="w-full h-full object-cover" loading="lazy" />
        </div>
      </section>
    </>
  );
}
