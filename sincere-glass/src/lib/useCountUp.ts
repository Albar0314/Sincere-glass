"use client";

import { useEffect, useState } from "react";

export function useCountUp(target: number, isActive: boolean, duration = 1500) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isActive) return;

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
