import { useEffect, useRef, useState } from 'react';
import useReducedMotion from '../hooks/useReducedMotion';

const TESTIMONIALS = [
  {
    quote: 'AnCore Marketing helped us build a strong online presence and increase our lead generation by 200% within 6 months. Highly professional team!',
    name: 'Tolulope A.',
    role: 'CEO, Aero Solutions',
  },
  {
    quote: 'From our first strategy call to launch, AnCore understood exactly how technical our buyers are. Our RFQ pipeline has never looked better.',
    name: 'Michael O.',
    role: 'Head of Growth, GreenWings Logistics',
  },
  {
    quote: "They rebuilt our brand positioning from the ground up. We finally sound like the company we actually are, not a generic competitor.",
    name: 'Amara K.',
    role: 'Marketing Director, SkyWay Engineering',
  },
];

export default function Testimonials({ wingImage }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reducedMotion = useReducedMotion();
  const trackRef = useRef(null);

  useEffect(() => {
    if (reducedMotion || paused) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % TESTIMONIALS.length);
    }, 5500);
    return () => clearInterval(id);
  }, [reducedMotion, paused]);

  function goTo(i) {
    setIndex(((i % TESTIMONIALS.length) + TESTIMONIALS.length) % TESTIMONIALS.length);
  }

  return (
    <div
      className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="lg:col-span-7">
        <svg className="w-10 h-10 text-gold mb-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M7.17 6C4.86 6 3 7.86 3 10.17c0 2.3 1.86 4.16 4.17 4.16.4 0 .78-.06 1.14-.16-.45 1.97-2.2 3.5-4.31 3.83v2.5c3.9-.36 7-3.7 7-7.83V10.5C10.5 8.02 8.65 6 7.17 6zm10 0C14.86 6 13 7.86 13 10.17c0 2.3 1.86 4.16 4.17 4.16.4 0 .78-.06 1.14-.16-.45 1.97-2.2 3.5-4.31 3.83v2.5c3.9-.36 7-3.7 7-7.83V10.5c0-2.48-1.85-4.5-3.83-4.5z" />
        </svg>

        <div className="overflow-hidden">
          <div
            ref={trackRef}
            className="flex"
            style={{
              width: `${TESTIMONIALS.length * 100}%`,
              transform: `translateX(-${index * (100 / TESTIMONIALS.length)}%)`,
              transition: reducedMotion ? 'none' : 'transform .55s cubic-bezier(.4,0,.2,1)',
            }}
          >
            {TESTIMONIALS.map((t) => (
              <div key={t.name} style={{ width: `${100 / TESTIMONIALS.length}%` }} className="flex-shrink-0 pr-4">
                <p className="text-lg sm:text-xl font-medium text-navy leading-relaxed mb-6">{t.quote}</p>
                <div>
                  <p className="font-bold text-navy text-sm">{t.name}</p>
                  <p className="text-gray-500 text-xs">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4 mt-8">
          <button
            onClick={() => goTo(index - 1)}
            aria-label="Previous testimonial"
            className="w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center text-navy hover:border-gold hover:text-gold transition"
          >
            ←
          </button>
          <div className="flex items-center gap-2">
            {TESTIMONIALS.map((t, i) => (
              <button
                key={t.name}
                onClick={() => goTo(i)}
                aria-label={`Go to testimonial ${i + 1}`}
                className={`h-2 rounded-full transition-all ${i === index ? 'w-6 bg-gold' : 'w-2 bg-gray-300'}`}
              />
            ))}
          </div>
          <button
            onClick={() => goTo(index + 1)}
            aria-label="Next testimonial"
            className="w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center text-navy hover:border-gold hover:text-gold transition"
          >
            →
          </button>
        </div>
      </div>

      <div className="lg:col-span-5">
        <div className="rounded-xl overflow-hidden shadow-xl" style={{ transform: 'rotate(2deg)' }}>
          <img src={wingImage.src} alt={wingImage.alt} className="w-full h-56 object-cover" loading="lazy" />
        </div>
      </div>
    </div>
  );
}
