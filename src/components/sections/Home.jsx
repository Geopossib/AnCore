import { useEffect, useRef, useState } from 'react';
import useReveal from '../../hooks/useReveal';
import useCountUp from '../../hooks/useCountUp';
import useReducedMotion from '../../hooks/useReducedMotion';
import heroPoster from '../../assets/images/hero-aircraft-hologram-01.jpg';
import AuroraBackground from '../AuroraBackground';
import Blob from '../Blob';
import MagneticButton from '../MagneticButton';

const HERO_VIDEO_SRC = 'https://videos.pexels.com/video-files/855130/855130-hd_1920_1080_30fps.mp4';

const JOURNEY = [
  { n: '1. DISCOVER', d: 'Visitor finds AnCore via search, social media, referral or ad.', path: 'M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z M9 12l2 2 4-4' },
  { n: '2. TRUST', d: 'They explore services, case studies, testimonials and insights.', path: 'M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z' },
  { n: '3. BOOK', d: 'They book a strategy call through the website scheduler.', path: 'M4 9.5h16 M8 3v3 M16 3v3' },
  { n: '4. PAY', d: 'They make a secure payment to confirm the engagement.', path: 'M3 10h18' },
  { n: '5. ONBOARD', d: 'They complete onboarding and share project details.', path: 'M12 3c2 2.5 3 5.5 3 8.5 0 2-.6 3.6-1.2 4.7L12 18l-1.8-1.8C9.6 15.1 9 13.5 9 11.5 9 8.5 10 5.5 12 3z' },
  { n: '6. COLLABORATE', d: 'We execute the strategy, communicate and deliver results.', path: 'M3 19c.5-3 2.5-4.5 5-4.5s4.5 1.5 5 4.5M13 19c.4-2.6 2.1-4 4-4s3.6 1.4 4 4' },
  { n: '7. REVIEW', d: 'They review performance, leave feedback and a testimonial.', path: 'M12 4l2.4 4.9 5.4.8-3.9 3.8.9 5.4L12 16.4l-4.8 2.5.9-5.4-3.9-3.8 5.4-.8z' },
  { n: '8. REFER', d: 'They refer AnCore to others, fueling mutual growth.', path: 'M3 11l16-6-5 16-3-6-6-2z' },
];

function StatCounter({ value, suffix = '', decimals = 0, label }) {
  const { ref, display } = useCountUp(value, { suffix, decimals });
  return (
    <div ref={ref}>
      <div className="text-2xl font-extrabold text-gold">{display}</div>
      <div className="text-[11px] text-muted font-medium">{label}</div>
    </div>
  );
}

function HeroVideo() {
  const videoRef = useRef(null);
  const wrapRef = useRef(null);
  const [videoFailed, setVideoFailed] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const video = videoRef.current;
    if (!video || reducedMotion) return;
    const saveData = navigator.connection && navigator.connection.saveData;
    if (saveData) return;
    video.play().catch(() => {
      // Autoplay blocked by the browser — poster image stays visible, no error state needed.
    });
  }, [reducedMotion]);

  // Light scroll parallax: the media layer drifts a touch slower than the page.
  useEffect(() => {
    if (reducedMotion) return;
    const el = wrapRef.current;
    if (!el) return;
    let ticking = false;
    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const offset = (window.innerHeight / 2 - (rect.top + rect.height / 2)) * 0.06;
        const clamped = Math.max(-14, Math.min(14, offset));
        el.style.transform = `translateY(${clamped}px)`;
        ticking = false;
      });
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [reducedMotion]);

  return (
    <div ref={wrapRef} className="relative w-full h-56 bg-navy" style={{ willChange: 'transform' }}>
      {!videoFailed && !reducedMotion && (
        <video
          ref={videoRef}
          className="w-full h-56 object-cover"
          poster={heroPoster}
          muted
          loop
          playsInline
          preload="metadata"
          aria-label="A passenger aircraft taking off from the runway"
          onError={() => setVideoFailed(true)}
        >
          <source src={HERO_VIDEO_SRC} type="video/mp4" />
        </video>
      )}
      {(videoFailed || reducedMotion) && (
        <img src={heroPoster} alt="Digital hologram of an aircraft projected above a tablet" className="w-full h-56 object-cover" />
      )}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(180deg, rgba(2,23,57,0) 40%, rgba(2,23,57,.85) 100%)' }}
      />
    </div>
  );
}

export default function Home({ setView, onBook }) {
  const heroLeft = useReveal(0);
  const heroRight = useReveal(0.12);

  return (
    <section className="view-section py-20 relative overflow-hidden">
      <AuroraBackground />
      <Blob className="w-72 h-72 -top-10 -left-16" />
      <Blob className="w-64 h-64 bottom-0 right-0" style={{ animationDelay: '3s' }} />

      <div className="relative z-10">
        <SectionHeaderInline />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div ref={heroLeft.ref} className={heroLeft.className} style={{ ...heroLeft.style }}>
            <h1 className="font-head text-4xl sm:text-5xl font-extrabold tracking-tight leading-[1.12] mb-6">
              Elevating Aerospace &amp; Aviation Brands to <span className="text-gold">New Heights</span>
            </h1>
            <p className="text-muted text-base leading-relaxed mb-8 max-w-lg">
              Data-driven marketing strategies designed for aerospace, aviation, engineering and tech innovators.
            </p>
            <div className="flex flex-wrap gap-3 mb-10">
              <MagneticButton onClick={onBook} className="btn-gold px-6 py-3.5 rounded font-semibold text-sm">
                Book a Strategy Call
              </MagneticButton>
              <button onClick={() => setView('services')} className="btn-outline px-6 py-3.5 rounded font-semibold text-sm">Explore Services</button>
            </div>
            <p className="text-[11px] uppercase tracking-widest text-muted font-semibold mb-3">Trusted by innovators</p>
            <div className="flex flex-wrap items-center gap-x-8 gap-y-3 text-white font-bold text-sm tracking-wide opacity-60">
              <span>BOEING</span><span>AIRBUS</span><span>SPACEX</span><span>LOCKHEED MARTIN</span>
            </div>
            <div className="grid grid-cols-3 gap-4 mt-8 max-w-md border-t border-line pt-6">
              <StatCounter value={20} suffix="+" label="Years of Experience" />
              <StatCounter value={100} suffix="+" label="Projects Completed" />
              <StatCounter value={98} suffix="%" label="Client Satisfaction" />
            </div>
          </div>

          <div ref={heroRight.ref} className={heroRight.className} style={{ ...heroRight.style }}>
            <div className="rounded-xl overflow-hidden panel hover-lift">
              {/* file: hero-aircraft-hologram-01.jpg (poster/fallback) */}
              <HeroVideo />
              <div className="p-6">
                <h3 className="font-head text-xl font-bold leading-snug mb-2">Elevating Aerospace &amp; Aviation Brands to New Heights</h3>
                <p className="text-muted text-xs mb-4">Data-driven marketing strategies for aerospace and aviation innovators.</p>
                <div className="flex gap-2">
                  <span className="btn-gold px-4 py-2 rounded text-xs font-semibold">Book a Strategy Call</span>
                  <span className="btn-outline px-4 py-2 rounded text-xs font-semibold">Explore Services</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-24">
          <h2 className="font-head text-center text-2xl font-extrabold tracking-tight mb-12">The Client Journey</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6">
            {JOURNEY.map((step, i) => (
              <JourneyStep key={step.n} step={step} delay={i * 0.08} bobDelay={i * 0.3} />
            ))}
          </div>
        </div>

        <div className="mt-16 flex justify-end">
          <button onClick={() => setView('services')} className="text-sm font-semibold text-gold flex items-center gap-1">
            Next: Services →
          </button>
        </div>
      </div>
    </section>
  );
}

function SectionHeaderInline() {
  return (
    <div className="flex items-center gap-3 mb-8">
      <span className="badge-num w-7 h-7 rounded flex items-center justify-center text-[11px] font-bold">01</span>
      <span className="text-xs font-bold uppercase tracking-widest text-muted">Homepage</span>
    </div>
  );
}

function JourneyStep({ step, delay, bobDelay }) {
  const { ref, className, style } = useReveal(delay);
  return (
    <div ref={ref} className={`text-center ${className}`} style={style}>
      <div
        className="icon-ring float-soft w-14 h-14 mx-auto rounded-full flex items-center justify-center mb-3"
        style={{ animationDelay: `${bobDelay}s` }}
      >
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <path strokeLinecap="round" strokeLinejoin="round" d={step.path} />
        </svg>
      </div>
      <h4 className="text-xs font-bold text-gold mb-1">{step.n}</h4>
      <p className="text-[11px] text-muted">{step.d}</p>
    </div>
  );
}
