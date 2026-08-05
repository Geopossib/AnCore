import { AnimatePresence, motion } from 'framer-motion';
import useReducedMotion from '../hooks/useReducedMotion';

/**
 * Renders a numeric string where each character rolls vertically into place
 * when it changes — the classic fintech "odometer" digit effect.
 * Pass the already-formatted display string (e.g. from useCountUp).
 */
export default function OdometerNumber({ value, className = '' }) {
  const reducedMotion = useReducedMotion();
  const chars = String(value).split('');

  if (reducedMotion) {
    return <span className={className}>{value}</span>;
  }

  return (
    <span className={className}>
      {chars.map((char, i) => (
        <span key={i} className="odometer-digit-mask">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span
              key={char + i}
              initial={{ y: '60%', opacity: 0 }}
              animate={{ y: '0%', opacity: 1 }}
              exit={{ y: '-60%', opacity: 0 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
              style={{ display: 'inline-block' }}
            >
              {char}
            </motion.span>
          </AnimatePresence>
        </span>
      ))}
    </span>
  );
}
