import { useEffect, useRef, useState } from 'react';
import useReducedMotion from './useReducedMotion';

/**
 * Attach to any element: const { ref, revealed } = useReveal(delay);
 * Adds a fade+rise-in effect once the element enters the viewport.
 */
export default function useReveal(delaySeconds = 0) {
  const ref = useRef(null);
  const [revealed, setRevealed] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) {
      setRevealed(true);
      return;
    }
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setRevealed(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [reducedMotion]);

  const style = { '--reveal-delay': `${delaySeconds}s` };
  const className = `reveal${revealed ? ' revealed' : ''}`;

  return { ref, revealed, style, className };
}
