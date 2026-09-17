import useReveal from '../../hooks/useReveal';
import useCountUp from '../../hooks/useCountUp';
import MagneticButton from '../MagneticButton';
import { getCaseStudy, getAdjacentCaseStudies } from '../../data/caseStudies';

function ResultStat({ stat }) {
  const { ref, display } = useCountUp(stat.value, { suffix: stat.suffix, decimals: stat.decimals });
  return (
    <div ref={ref} className="text-center px-4">
      <div className="text-3xl sm:text-4xl font-extrabold text-gold mb-2">{display}</div>
      <div className="text-xs sm:text-sm text-white/60 font-medium leading-snug max-w-[180px] mx-auto">{stat.label}</div>
    </div>
  );
}

export default function CaseStudy({ projectKey, setView, onBook, onOpenCase }) {
  const study = getCaseStudy(projectKey);
  const heroReveal = useReveal(0);
  const contentReveal = useReveal(0);
  const sidebarReveal = useReveal(0.1);
  const resultsReveal = useReveal(0);
  const galleryReveal = useReveal(0);
  const takeawayReveal = useReveal(0);

  if (!study) {
    return (
      <div className="relative left-1/2 w-screen -translate-x-1/2 bg-white">
        <section className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          <h1 className="font-poppins font-bold text-2xl text-[#1D2433] mb-3">Case study not found</h1>
          <p className="text-gray-500 text-sm mb-6">This project may have moved or isn&apos;t published yet.</p>
          <button onClick={() => setView('portfolio')} className="btn-gold px-6 py-3 rounded font-semibold text-sm">
            Back to Portfolio
          </button>
        </section>
      </div>
    );
  }

  const { prev, next } = getAdjacentCaseStudies(study.key);

  return (
    <div className="relative left-1/2 w-screen -translate-x-1/2 bg-white">
      {/* ===== HERO ===== */}
      <section className="relative overflow-hidden" style={{ background: '#021739' }}>
        <div className="absolute inset-0 overflow-hidden">
          <img src={study.coverImage.src} alt={study.coverImage.alt} className="w-full h-full object-cover opacity-40" loading="eager" />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(2,23,57,0.85) 0%, rgba(2,23,57,0.96) 100%)' }} />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-16 sm:pt-20 sm:pb-24">
          <div ref={heroReveal.ref} className={heroReveal.className} style={heroReveal.style}>
            <p className="text-xs text-white/50 mb-6">
              <button onClick={() => setView('home')} className="hover:text-gold transition">Home</button>
              {' / '}
              <button onClick={() => setView('portfolio')} className="hover:text-gold transition">Portfolio</button>
              {' / '}
              <span className="text-white/70">{study.title}</span>
            </p>

            <div className="flex flex-wrap gap-2 mb-5">
              {study.tags.map((t) => (
                <span key={t} className="text-[11px] font-semibold uppercase tracking-wide px-3 py-1.5 rounded-full bg-white/10 text-gold border border-gold/30">
                  {t}
                </span>
              ))}
            </div>

            <h1 className="font-poppins font-bold text-3xl sm:text-5xl text-white leading-tight mb-4 max-w-3xl">
              {study.title}
            </h1>
            <p className="text-white/70 text-sm sm:text-base leading-relaxed max-w-2xl mb-8">{study.summary}</p>

            <div className="flex flex-wrap gap-x-10 gap-y-4 text-sm">
              <div>
                <span className="block text-[11px] uppercase tracking-widest text-white/40 font-semibold mb-1">Client</span>
                <span className="text-white font-semibold">{study.client}</span>
              </div>
              <div>
                <span className="block text-[11px] uppercase tracking-widest text-white/40 font-semibold mb-1">Timeline</span>
                <span className="text-white font-semibold">{study.timeline}</span>
              </div>
              <div>
                <span className="block text-[11px] uppercase tracking-widest text-white/40 font-semibold mb-1">Services</span>
                <span className="text-white font-semibold">{study.services.join(', ')}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CHALLENGE + APPROACH ===== */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          <div ref={contentReveal.ref} className={`lg:col-span-8 ${contentReveal.className}`} style={contentReveal.style}>
            <div className="mb-10">
              <span className="text-xs font-bold uppercase tracking-widest text-gold block mb-3">The Challenge</span>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">{study.challenge}</p>
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-gold block mb-3">Our Approach</span>
              <ul className="space-y-3">
                {study.approach.map((point) => (
                  <li key={point} className="flex gap-3 text-gray-600 text-sm sm:text-base leading-relaxed">
                    <svg className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div ref={sidebarReveal.ref} className={`lg:col-span-4 ${sidebarReveal.className}`} style={sidebarReveal.style}>
            <div className="bg-[#F5F7FA] rounded-xl p-6 sm:p-7 lg:sticky lg:top-28">
              <h3 className="font-poppins font-bold text-[#1D2433] text-sm mb-5">Project Snapshot</h3>
              <dl className="space-y-4 mb-6">
                <div>
                  <dt className="text-[11px] uppercase tracking-widest text-gray-400 font-semibold mb-1">Client</dt>
                  <dd className="text-sm text-[#1D2433] font-semibold">{study.client}</dd>
                </div>
                <div>
                  <dt className="text-[11px] uppercase tracking-widest text-gray-400 font-semibold mb-1">Services</dt>
                  <dd className="text-sm text-[#1D2433] font-semibold">{study.services.join(', ')}</dd>
                </div>
                <div>
                  <dt className="text-[11px] uppercase tracking-widest text-gray-400 font-semibold mb-1">Timeline</dt>
                  <dd className="text-sm text-[#1D2433] font-semibold">{study.timeline}</dd>
                </div>
              </dl>
              <MagneticButton onClick={onBook} className="w-full btn-gold py-3 rounded font-semibold text-sm text-center">
                Start a Project Like This
              </MagneticButton>
            </div>
          </div>
        </div>
      </section>

      {/* ===== RESULTS ===== */}
      <section className="relative left-0 w-full py-16 sm:py-20" style={{ background: '#021739' }}>
        <div ref={resultsReveal.ref} className={resultsReveal.className} style={resultsReveal.style}>
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-gold block mb-2">The Results</span>
            <h2 className="font-poppins font-bold text-2xl sm:text-3xl text-white">What changed</h2>
          </div>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-4 sm:divide-x sm:divide-white/10">
            {study.results.map((stat) => (
              <ResultStat key={stat.label} stat={stat} />
            ))}
          </div>
        </div>
      </section>

      {/* ===== GALLERY ===== */}
      {study.gallery.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
          <div ref={galleryReveal.ref} className={galleryReveal.className} style={galleryReveal.style}>
            <span className="text-xs font-bold uppercase tracking-widest text-gold block mb-6 text-center">Project Gallery</span>
            <div className={`grid grid-cols-1 ${study.gallery.length > 1 ? 'sm:grid-cols-2' : ''} gap-5`}>
              {study.gallery.map((img) => (
                <div key={img.src} className="rounded-xl overflow-hidden shadow-md">
                  <img src={img.src} alt={img.alt} className="w-full h-64 sm:h-80 object-cover" loading="lazy" />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ===== TAKEAWAY ===== */}
      <section className="bg-[#F5F7FA] py-14 sm:py-16">
        <div ref={takeawayReveal.ref} className={`max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center ${takeawayReveal.className}`} style={takeawayReveal.style}>
          <svg className="w-8 h-8 text-gold mx-auto mb-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M7.17 6C4.87 8.06 3.5 10.75 3.5 13.5 3.5 16.5 5.5 18.5 8 18.5c2 0 3.5-1.5 3.5-3.5 0-1.8-1.3-3.2-3-3.45C9 9.5 10.5 8 12.5 6.7L11 5C9.5 5.5 8.2 5.5 7.17 6zm9 0c-2.3 2.06-3.67 4.75-3.67 7.5 0 3 2 5 4.5 5 2 0 3.5-1.5 3.5-3.5 0-1.8-1.3-3.2-3-3.45C18 9.5 19.5 8 21.5 6.7L20 5c-1.5.5-2.8.5-3.83 1z" />
          </svg>
          <p className="font-poppins font-semibold text-lg sm:text-xl text-[#1D2433] leading-snug">{study.takeaway}</p>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="relative overflow-hidden" style={{ background: 'linear-gradient(90deg, #C9980B, #B8890A)' }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16 text-center">
          <h2 className="font-poppins font-bold text-2xl sm:text-3xl text-navy mb-3">Want results like this?</h2>
          <p className="text-navy/80 text-sm mb-7 max-w-lg mx-auto">Let&apos;s talk about what a similar strategy could look like for your business.</p>
          <MagneticButton onClick={onBook} className="px-7 py-3.5 rounded font-semibold text-sm bg-navy text-white hover:bg-navy/90 transition inline-block">
            Book Your Free Consultation →
          </MagneticButton>
        </div>
      </section>

      {/* ===== PREV / NEXT ===== */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col sm:flex-row items-stretch justify-between gap-4">
          <button
            onClick={() => onOpenCase(prev.key)}
            className="flex-1 text-left px-5 py-4 rounded-xl border border-gray-200 hover:border-gold/50 transition group"
          >
            <span className="text-[11px] uppercase tracking-widest text-gray-400 font-semibold block mb-1">← Previous Project</span>
            <span className="text-sm font-semibold text-[#1D2433] group-hover:text-gold transition">{prev.title}</span>
          </button>
          <button onClick={() => setView('portfolio')} className="px-5 py-4 rounded-xl bg-navy text-white text-sm font-semibold hover:bg-navy/90 transition whitespace-nowrap">
            All Projects
          </button>
          <button
            onClick={() => onOpenCase(next.key)}
            className="flex-1 text-right px-5 py-4 rounded-xl border border-gray-200 hover:border-gold/50 transition group"
          >
            <span className="text-[11px] uppercase tracking-widest text-gray-400 font-semibold block mb-1">Next Project →</span>
            <span className="text-sm font-semibold text-[#1D2433] group-hover:text-gold transition">{next.title}</span>
          </button>
        </div>
      </section>
    </div>
  );
}
