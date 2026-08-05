import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import useReducedMotion from '../hooks/useReducedMotion';

/**
 * Wraps card content with a subtle 3D tilt that follows the cursor.
 * GPU-accelerated (transform only). No-ops under reduced motion.
 */
export default function TiltCard({ children, className = '', onClick, maxTilt = 8 }) {
  const ref = useRef(null);
  const reducedMotion = useReducedMotion();

  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const springConfig = { stiffness: 220, damping: 20, mass: 0.4 };
  const spx = useSpring(px, springConfig);
  const spy = useSpring(py, springConfig);

  const rotateX = useTransform(spy, [0, 1], [maxTilt, -maxTilt]);
  const rotateY = useTransform(spx, [0, 1], [-maxTilt, maxTilt]);

  function handleMouseMove(e) {
    if (reducedMotion || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    px.set((e.clientX - rect.left) / rect.width);
    py.set((e.clientY - rect.top) / rect.height);
  }

  function handleMouseLeave() {
    px.set(0.5);
    py.set(0.5);
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={reducedMotion ? undefined : { scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      style={
        reducedMotion
          ? undefined
          : { rotateX, rotateY, transformPerspective: 800, transformStyle: 'preserve-3d' }
      }
    >
      {children}
    </motion.div>
  );
}
