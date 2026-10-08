'use client';

import { useEffect, useState } from 'react';
export default function ReadingProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    function onScroll() {
      const el = document.getElementById('article-content');
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = el.scrollHeight - window.innerHeight;
      const scrolled = -rect.top;
      setProgress(Math.min(100, Math.max(0, scrolled / total * 100)));
    }
    window.addEventListener('scroll', onScroll, {
      passive: true
    });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return <div className="fixed top-0 left-0 right-0 z-50 h-[3px] bg-transparent">
      <div className="h-full bg-[#DAA745] transition-[width] duration-150 ease-out" style={{
      width: `${progress}%`
    }} />
    </div>;
}