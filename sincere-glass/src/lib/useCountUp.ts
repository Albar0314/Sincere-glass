"use client";

import { useEffect, useRef, useState } from "react";

// FIX-COUNTUP-SSR-V1: SSR and no-JS render the final target so crawlers and
// non-JS users see the real number (fixes "0+" counters). On the client, when
// the element scrolls into view (isActive), the value resets to 0 once and
// animates up to the target.
export function useCountUp(target: number, isActive: boolean, duration = 1500) {
  const [count, setCount] = useState(target);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isActive || hasAnimated.current) return;
    hasAnimated.current = true;

    setCount(0);
    const startTime = performance.now();

    function step(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
  }, [isActive, target, duration]);

  return count;
}
