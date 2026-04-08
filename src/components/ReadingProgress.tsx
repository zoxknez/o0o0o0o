'use client';

import { useEffect, useState } from 'react';

export default function ReadingProgress({ color = '#00d4ff' }: { color?: string }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const currentScroll = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight) {
        setProgress(Number((currentScroll / scrollHeight).toFixed(2)) * 100);
      }
    };

    window.addEventListener('scroll', updateProgress);
    return () => window.removeEventListener('scroll', updateProgress);
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: `${progress}%`,
        height: '3px',
        backgroundColor: color,
        boxShadow: `0 0 10px ${color}`,
        zIndex: 1000,
        transition: 'width 0.1s ease-out'
      }}
      aria-hidden="true"
    />
  );
}
