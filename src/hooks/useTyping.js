import { useEffect, useState } from 'react';
import useReducedMotion from './useReducedMotion';

export default function useTyping(text, speed = 110) {
  const reducedMotion = useReducedMotion();
  const [output, setOutput] = useState(reducedMotion ? text : '');

  useEffect(() => {
    if (reducedMotion) {
      setOutput(text);
      return;
    }
    let i = 0;
    let cancelled = false;
    function step() {
      if (cancelled) return;
      setOutput(text.slice(0, i));
      i++;
      if (i <= text.length) setTimeout(step, speed);
    }
    step();
    return () => {
      cancelled = true;
    };
  }, [text, speed, reducedMotion]);

  return output;
}
