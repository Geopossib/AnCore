import { useEffect, useRef, useState, useCallback } from 'react';
import SectionHeader from '../SectionHeader';
import useCountUp from '../../hooks/useCountUp';
import useReveal from '../../hooks/useReveal';
import useReducedMotion from '../../hooks/useReducedMotion';
import Blob from '../Blob';
import OdometerNumber from '../OdometerNumber';
import DeltaBadge from '../DeltaBadge';

const NAV_ITEMS = [
  { label: 'Dashboard', path: <><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></> },
  { label: 'Projects', path: <path strokeLinecap="round" strokeLinejoin="round" d="M3 7l2-3h5l2 3h9v12H3z" /> },
  { label: 'Tasks', path: <><rect x="4" y="4" width="16" height="16" rx="2" /><path strokeLinecap="round" strokeLinejoin="round" d="M8 12l2.5 2.5L16 9" /></> },
  { label: 'Reports', path: <><rect x="4" y="3" width="16" height="18" rx="1.5" /><path strokeLinecap="round" d="M8 8h8M8 12h8M8 16h5" /></> },
  { label: 'Messages', path: <path strokeLinecap="round" strokeLinejoin="round" d="M4 5h16v11H8l-4 4z" /> },
  { label: 'Invoices', path: <><rect x="4" y="3" width="16" height="18" rx="1.5" /><path strokeLinecap="round" d="M8 8h8M8 12h4" /><circle cx="15" cy="15" r="2.2" /></> },
];

// Discrete points for the "Performance Overview" line — piecewise-linear so
// crosshair hit-testing lines up exactly with what's drawn.
const CHART_POINTS = [
  { x: 0, y: 82, label: 'Jan', leads: 640 },
  { x: 57, y: 68, label: 'Feb', leads: 720 },
  { x: 114, y: 74, label: 'Mar', leads: 690 },
  { x: 171, y: 52, label: 'Apr', leads: 860 },
  { x: 228, y: 44, label: 'May', leads: 940 },
  { x: 285, y: 30, label: 'Jun', leads: 1080 },
  { x: 342, y: 22, label: 'Jul', leads: 1170 },
  { x: 400, y: 10, label: 'Aug', leads: 1256 },
];
const CHART_PATH_D = CHART_POINTS.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x},${p.y}`).join(' ');

function StatCounter({ value, suffix = '', decimals = 0, format, label, delta }) {
  const { ref, display } = useCountUp(value, { suffix, decimals, format });
  return (
    <div ref={ref}>
      <OdometerNumber value={display} className="text-lg font-extrabold" />
      <div className="text-[10px] text-muted flex items-center justify-center gap-1.5 mt-1">
        {label} <DeltaBadge value={delta} />
      </div>
    </div>
  );
}

function PortalChart() {
  const wrapRef = useRef(null);
  const svgRef = useRef(null);
  const pathRef = useRef(null);
  const [drawn, setDrawn] = useState(false);
  const [hover, setHover] = useState(null); // { point, screenX }
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

  const handleMouseMove = useCallback((e) => {
    const svg = svgRef.current;
    if (!svg) return;
    const rect = svg.getBoundingClientRect();
    const viewBoxX = ((e.clientX - rect.left) / rect.width) * 400;
    let nearest = CHART_POINTS[0];
    let minDist = Infinity;
    CHART_POINTS.forEach((p) => {
      const dist = Math.abs(p.x - viewBoxX);
      if (dist < minDist) {
        minDist = dist;
        nearest = p;
      }
    });
    setHover({ point: nearest, screenX: rect.left + (nearest.x / 400) * rect.width });
  }, []);

  return (
    <div ref={wrapRef} className="relative h-32">
      {!drawn && <div className="skeleton absolute inset-0 rounded" />}
      <svg
        ref={svgRef}
        className="w-full h-32 relative cursor-crosshair"
        viewBox="0 0 400 100"
        preserveAspectRatio="none"
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setHover(null)}
      >
        <path ref={pathRef} d={CHART_PATH_D} fill="none" stroke="#C9980B" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" />
        {hover && drawn && (
          <>
            <line x1={hover.point.x} y1="0" x2={hover.point.x} y2="100" stroke="rgba(201,152,11,0.35)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
            <circle cx={hover.point.x} cy={hover.point.y} r="3.5" fill="#021739" stroke="#C9980B" strokeWidth="2" />
          </>
        )}
      </svg>
      {hover && drawn && (
        <div
          className="absolute -top-2 pointer-events-none panel rounded px-2.5 py-1.5 text-[10px] whitespace-nowrap z-10"
          style={{
            left: `${(hover.point.x / 400) * 100}%`,
            transform: hover.point.x > 300 ? 'translate(-100%, -100%)' : 'translate(-8px, -100%)',
          }}
        >
          <span className="font-bold text-white">{hover.point.label}</span>{' '}
          <span className="text-gold font-bold">{hover.point.leads.toLocaleString()} leads</span>
        </div>
      )}
      <div className="flex justify-between text-[9px] text-muted mt-1">
        {CHART_POINTS.map((p) => (
          <span key={p.label}>{p.label}</span>
        ))}
      </div>
    </div>
  );
}

export default function Portal({ setView }) {
  const sidebarReveal = useReveal(0);
  const chartReveal = useReveal(0.1);

  function handleSpot(e) {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    el.style.setProperty('--spot-x', `${e.clientX - rect.left}px`);
    el.style.setProperty('--spot-y', `${e.clientY - rect.top}px`);
  }

  return (
    <section className="view-section py-20 relative overflow-hidden">
      <Blob className="w-80 h-80 top-10 -right-24 opacity-60" style={{ animationDelay: '1.5s' }} />
      <div className="relative z-10">
        <SectionHeader num="12" label="Client Portal" />
        <h2 className="font-head text-3xl font-extrabold mb-2">Your Project Hub</h2>
        <p className="text-muted text-sm mb-8 max-w-md">Collaborate, track progress and access everything in one place.</p>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div
            ref={sidebarReveal.ref}
            onMouseMove={handleSpot}
            className={`lg:col-span-4 panel spotlight rounded-xl p-6 hover-lift ${sidebarReveal.className}`}
            style={sidebarReveal.style}
          >
            <ul className="space-y-4 text-sm font-semibold relative z-10">
              {NAV_ITEMS.map((item) => (
                <li key={item.label} className="flex items-center gap-3">
                  <svg className="w-4 h-4 text-gold" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">{item.path}</svg>
                  {item.label}
                </li>
              ))}
            </ul>
          </div>
          <div
            ref={chartReveal.ref}
            onMouseMove={handleSpot}
            className={`lg:col-span-8 panel spotlight rounded-xl p-6 hover-lift ${chartReveal.className}`}
            style={chartReveal.style}
          >
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-sm font-bold">Performance Overview</h4>
                <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-gold">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold pulse-dot" />Live
                </span>
              </div>
              <PortalChart />
              <div className="grid grid-cols-3 gap-4 mt-4 text-center border-t border-line pt-4">
                <StatCounter value={1256} format="comma" label="Leads" delta="+22%" />
                <StatCounter value={54.3} suffix="K" decimals={1} label="Website Traffic" delta="+18%" />
                <StatCounter value={245} format="comma" label="Conversions" delta="+31%" />
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-between mt-10">
          <button onClick={() => setView('onboarding')} className="text-sm font-semibold text-muted">← Client Onboarding</button>
          <button onClick={() => setView('home')} className="text-sm font-semibold text-gold">Back to Homepage →</button>
        </div>
      </div>
    </section>
  );
}
