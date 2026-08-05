import { useEffect, useRef } from 'react';
import useReducedMotion from '../hooks/useReducedMotion';

/**
 * A tiny inline trend line — purely decorative "this is live data" signal
 * for a stat. Points are normalized 0–1; pass any short trend shape.
 */
export default function Sparkline({ points = [0.3, 0.5, 0.35, 0.6, 0.5, 0.8, 0.7, 1], width = 64, height = 20, color = '#C9980B' }) {
  const pathRef = useRef(null);
  const reducedMotion = useReducedMotion();

  const step = width / (points.length - 1);
  const d = points
    .map((p, i) => `${i === 0 ? 'M' : 'L'} ${i * step},${height - p * height}`)
    .join(' ');

  useEffect(() => {
    const path = pathRef.current;
    if (!path || reducedMotion) return;
    const length = path.getTotalLength();
    path.style.strokeDasharray = length;
    path.style.strokeDashoffset = length;
    requestAnimationFrame(() => {
      path.style.transition = 'stroke-dashoffset 1s ease-out';
      path.style.strokeDashoffset = '0';
    });
  }, [reducedMotion]);

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className="overflow-visible">
      <path ref={pathRef} d={d} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={width} cy={height - points[points.length - 1] * height} r="2" fill={color} />
    </svg>
  );
}
