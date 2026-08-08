import useReveal from '../../hooks/useReveal';
import useCountUp from '../../hooks/useCountUp';

const TEAM_IMAGE = {
  src: 'https://images.unsplash.com/photo-1758518731706-be5d5230e5a5?auto=format&fit=crop&w=900&q=80',
  alt: 'Diverse marketing team collaborating around a laptop in a modern office',
};

const VALUES = [
  { label: 'Our Mission', desc: 'To help businesses grow through smart marketing.', d: 'M9 18h6M10 21h4M12 3a6 6 0 00-4 10.5c.5.5.9 1.1 1 2.5h6c.1-1.4.5-2 1-2.5A6 6 0 0012 3z' },
  { label: 'Our Vision', desc: "To be Africa's leading marketing agency.", d: 'M21 10c0 6-9 12-9 12s-9-6-9-12a9 9 0 1118 0z' },
  { label: 'Our Values', desc: 'Integrity, Innovation, Excellence, Impact.', d: 'M12 20h9M16.5 3.5a2.1 2.1 0 013 3L7 19l-4 1 1-4z' },
];

function StatCounter({ value, suffix = '', decimals = 0, label }) {
  const { ref, display } = useCountUp(value, { suffix, decimals });
  return (
    <div ref={ref} className="text-center">
      <div className="text-2xl sm:text-3xl font-extrabold text-[#C8922E]">{display}</div>
      <div className="text-xs text-white/60 font-medium mt-1">{label}</div>
    </div>
  );
}

export default function About({ setView }) {
  const heroReveal = useReveal(0);
  const textReveal = useReveal(0);
  const imgReveal = useReveal(0.1);
  const statsReveal = useReveal(0);

  return (
    <div className="relative left-1/2 w-screen -translate-x-1/2 bg-white">
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10 text-center">
        <div ref={heroReveal.ref} className={heroReveal.className} style={heroReveal.style}>
          <h1 className="font-poppins font-bold text-4xl text-[#1D2433] mb-2">About AnCore Marketing</h1>
          <p className="text-gray-400 text-xs">
            <button onClick={() => setView('home')} className="hover:text-[#C8922E]">Home</button> / About Us
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div ref={textReveal.ref} className={`lg:col-span-6 ${textReveal.className}`} style={textReveal.style}>
            <p className="font-poppins font-semibold text-lg text-[#1D2433] leading-snug mb-4">
              We are a results-driven marketing agency helping brands navigate the digital world with clarity and confidence.
            </p>
            <p className="text-gray-500 text-sm leading-relaxed mb-8">
              At AnCore Marketing, we combine creativity, technology and data to craft marketing solutions that connect
              brands to the right audience and drive sustainable growth.
            </p>
            <div className="grid grid-cols-3 gap-4">
              {VALUES.map((v) => (
                <div key={v.label}>
                  <svg className="w-6 h-6 text-[#C8922E] mb-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                    <path strokeLinecap="round" strokeLinejoin="round" d={v.d} />
                  </svg>
                  <h4 className="font-poppins font-semibold text-[#1D2433] text-xs mb-1">{v.label}</h4>
                  <p className="text-[11px] text-gray-500 leading-snug">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
          <div ref={imgReveal.ref} className={`lg:col-span-6 ${imgReveal.className}`} style={imgReveal.style}>
            <div className="rounded-xl overflow-hidden shadow-lg">
              <img src={TEAM_IMAGE.src} alt={TEAM_IMAGE.alt} className="w-full h-80 object-cover" loading="lazy" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-10" style={{ background: '#071C44' }}>
        <div ref={statsReveal.ref} className={`max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 sm:grid-cols-4 gap-6 ${statsReveal.className}`} style={statsReveal.style}>
          <StatCounter value={50} suffix="+" label="Clients" />
          <StatCounter value={120} suffix="+" label="Projects" />
          <StatCounter value={5} suffix="+" label="Industries" />
          <StatCounter value={98} suffix="%" label="Satisfaction" />
        </div>
      </section>
    </div>
  );
}
