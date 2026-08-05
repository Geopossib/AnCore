import { useEffect, useRef, useState } from 'react';
import useReducedMotion from './useReducedMotion';

function formatValue(value, { decimals = 0, prefix = '', suffix = '', format }) {
  let out;
  if (format === 'comma') {
    out = Math.round(value).toLocaleString('en-US');
  } else {
    out = decimals > 0 ? value.toFixed(decimals) : Math.round(value).toString();
  }
  return `${prefix}${out}${suffix}`;
}

/**
 * const { ref, display } = useCountUp(1256, { format: 'comma' });
 * Renders "0" until scrolled into view, then eases up to the target once.
 */
export default function useCountUp(target, options = {}) {
  const ref = useRef(null);
  const [display, setDisplay] = useState(() => formatValue(0, options));
  const reducedMotion = useReducedMotion();
  const startedRef = useRef(false);

  useEffect(() => {
    if (reducedMotion) {
      setDisplay(formatValue(target, options));
      return;
    }
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !startedRef.current) {
            startedRef.current = true;
            const duration = 1400;
            const start = performance.now();
            function tick(now) {
              const progress = Math.min((now - start) / duration, 1);
              const eased = 1 - Math.pow(1 - progress, 3);
              setDisplay(formatValue(target * eased, options));
              if (progress < 1) requestAnimationFrame(tick);
            }
            requestAnimationFrame(tick);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target, reducedMotion]);

  return { ref, display };
}
