import { useEffect, useRef } from 'react';
import useReducedMotion from '../hooks/useReducedMotion';

export default function SecureBadge() {
  const pathRef = useRef(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const path = pathRef.current;
    if (!path || reducedMotion) return;
    const length = path.getTotalLength();
    path.style.strokeDasharray = length;
    path.style.strokeDashoffset = length;
    requestAnimationFrame(() => {
      path.style.transition = 'stroke-dashoffset 1s cubic-bezier(.4,0,.2,1)';
      path.style.strokeDashoffset = '0';
    });
  }, [reducedMotion]);

  return (
    <div className="flex items-center gap-2">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <rect x="4" y="10" width="16" height="10" rx="2" stroke="#C9980B" strokeWidth="1.6" />
        <path
          ref={pathRef}
          d="M7 10V7a5 5 0 0110 0v3 M9.5 15l1.8 1.8L15 13"
          stroke="#C9980B"
          strokeWidth="1.6"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="text-[11px] text-muted">Your payment is 100% secure.</span>
    </div>
  );
}
