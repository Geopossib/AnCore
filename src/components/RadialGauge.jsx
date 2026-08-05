import { useEffect, useRef, useState } from 'react';
import useReducedMotion from '../hooks/useReducedMotion';

export default function RadialGauge({ value = 98, size = 72, stroke = 6, label }) {
  const wrapRef = useRef(null);
  const [animated, setAnimated] = useState(false);
  const reducedMotion = useReducedMotion();

  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const target = reducedMotion || animated ? value : 0;
  const offset = circumference - (target / 100) * circumference;

  useEffect(() => {
    if (reducedMotion) {
      setAnimated(true);
      return;
    }
    const el = wrapRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setAnimated(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [reducedMotion]);

  return (
    <div ref={wrapRef} className="inline-flex flex-col items-center">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
          <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="#122A5C" strokeWidth={stroke} />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="#C9980B"
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            style={{ transition: reducedMotion ? 'none' : 'stroke-dashoffset 1.3s cubic-bezier(.4,0,.2,1)' }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center text-lg font-extrabold text-gold">{value}%</div>
      </div>
      {label && <div className="text-[11px] text-muted font-medium mt-2">{label}</div>}
    </div>
  );
}
