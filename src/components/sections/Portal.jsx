import { useEffect, useRef, useState } from 'react';
import SectionHeader from '../SectionHeader';
import useCountUp from '../../hooks/useCountUp';
import useReveal from '../../hooks/useReveal';
import useReducedMotion from '../../hooks/useReducedMotion';

const NAV_ITEMS = [
  { label: 'Dashboard', path: <><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></> },
  { label: 'Projects', path: <path strokeLinecap="round" strokeLinejoin="round" d="M3 7l2-3h5l2 3h9v12H3z" /> },
  { label: 'Tasks', path: <><rect x="4" y="4" width="16" height="16" rx="2" /><path strokeLinecap="round" strokeLinejoin="round" d="M8 12l2.5 2.5L16 9" /></> },
  { label: 'Reports', path: <><rect x="4" y="3" width="16" height="18" rx="1.5" /><path strokeLinecap="round" d="M8 8h8M8 12h8M8 16h5" /></> },
  { label: 'Messages', path: <path strokeLinecap="round" strokeLinejoin="round" d="M4 5h16v11H8l-4 4z" /> },
  { label: 'Invoices', path: <><rect x="4" y="3" width="16" height="18" rx="1.5" /><path strokeLinecap="round" d="M8 8h8M8 12h4" /><circle cx="15" cy="15" r="2.2" /></> },
];

function StatCounter({ value, suffix = '', decimals = 0, format, label }) {
  const { ref, display } = useCountUp(value, { suffix, decimals, format });
  return (
    <div ref={ref}>
      <div className="text-lg font-extrabold">{display}</div>
      <div className="text-[10px] text-muted">{label}</div>
    </div>
  );
}

function PortalChart() {
  const wrapRef = useRef(null);
  const pathRef = useRef(null);
  const [drawn, setDrawn] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) {
      setDrawn(true);
      return;
    }
    const el = wrapRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !drawn) {
            const path = pathRef.current;
            if (path) {
              const length = path.getTotalLength();
              path.style.strokeDasharray = length;
              path.style.strokeDashoffset = length;
              setTimeout(() => {
                path.style.transition = 'stroke-dashoffset 1.1s cubic-bezier(.4,0,.2,1)';
                path.style.strokeDashoffset = '0';
              }, 450);
            }
            setDrawn(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div ref={wrapRef} className="relative h-32">
      {!drawn && <div className="skeleton absolute inset-0 rounded" />}
      <svg className="w-full h-32 relative" viewBox="0 0 400 100" preserveAspectRatio="none">
        <path ref={pathRef} d="M0,80 Q50,40 100,55 T200,20 T300,40 T400,10" fill="none" stroke="#C9980B" strokeWidth="3" />
      </svg>
    </div>
  );
}

export default function Portal({ setView }) {
  const sidebarReveal = useReveal(0);
  const chartReveal = useReveal(0.1);

  return (
    <section className="view-section py-20">
      <SectionHeader num="12" label="Client Portal" />
      <h2 className="font-head text-3xl font-extrabold mb-2">Your Project Hub</h2>
      <p className="text-muted text-sm mb-8 max-w-md">Collaborate, track progress and access everything in one place.</p>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div ref={sidebarReveal.ref} className={`lg:col-span-4 panel rounded-xl p-6 hover-lift ${sidebarReveal.className}`} style={sidebarReveal.style}>
          <ul className="space-y-4 text-sm font-semibold">
            {NAV_ITEMS.map((item) => (
              <li key={item.label} className="flex items-center gap-3">
                <svg className="w-4 h-4 text-gold" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">{item.path}</svg>
                {item.label}
              </li>
            ))}
          </ul>
        </div>
        <div ref={chartReveal.ref} className={`lg:col-span-8 panel rounded-xl p-6 hover-lift ${chartReveal.className}`} style={chartReveal.style}>
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-sm font-bold">Performance Overview</h4>
            <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-gold">
              <span className="w-1.5 h-1.5 rounded-full bg-gold pulse-dot" />Live
            </span>
          </div>
          <PortalChart />
          <div className="grid grid-cols-3 gap-4 mt-4 text-center border-t border-line pt-4">
            <StatCounter value={1256} format="comma" label="Leads +22%" />
            <StatCounter value={54.3} suffix="K" decimals={1} label="Website Traffic +18%" />
            <StatCounter value={245} format="comma" label="Conversions +31%" />
          </div>
        </div>
      </div>

      <div className="flex justify-between mt-10">
        <button onClick={() => setView('onboarding')} className="text-sm font-semibold text-muted">← Client Onboarding</button>
        <button onClick={() => setView('home')} className="text-sm font-semibold text-gold">Back to Homepage →</button>
      </div>
    </section>
  );
}
