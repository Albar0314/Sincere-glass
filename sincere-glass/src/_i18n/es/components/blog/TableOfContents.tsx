'use client';

import { useEffect, useState } from 'react';
interface TOCItem {
  id: string;
  text: string;
  level: number;
}
interface Props {
  items: TOCItem[];
}
export default function TableOfContents({
  items
}: Props) {
  const [activeId, setActiveId] = useState('');
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      const visible = entries.filter(e => e.isIntersecting);
      if (visible.length > 0) {
        setActiveId(visible[0].target.id);
      }
    }, {
      rootMargin: '-80px 0px -70% 0px'
    });
    items.forEach(({
      id
    }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [items]);
  if (items.length === 0) return null;
  return <nav className="hidden lg:block sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto">
      <p className="text-xs font-medium text-[#8B95A5] uppercase tracking-wider mb-4">
        En este artículo
      </p>
      <ul className="space-y-1 border-l border-[#3A4250]/20">
        {items.map(({
        id,
        text,
        level
      }) => <li key={id}>
            <a href={`#${id}`} onClick={e => {
          e.preventDefault();
          document.getElementById(id)?.scrollIntoView({
            behavior: 'smooth'
          });
        }} className={`block py-1.5 text-sm transition-colors duration-200 border-l-2 -ml-[1px] ${level === 3 ? 'pl-8' : 'pl-4'} ${activeId === id ? 'border-[#DAA745] text-[#DAA745] font-medium' : 'border-transparent text-[#8B95A5] hover:text-[#F2F0ED] hover:border-[#8B95A5]'}`}>
              {text}
            </a>
          </li>)}
      </ul>
    </nav>;
}